'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  badge?: string;
  rating: number;
  reviewCount: number;
}

interface FeaturedProductsProps {
  className?: string;
}

const FeaturedProducts = ({ className = '' }: FeaturedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          orderBy('createdAt', 'desc'),
          limit(6)
        );

        const querySnapshot = await getDocs(q);

        const fetchedProducts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const discount = data.discount || 0;
          const finalPrice = discount > 0
            ? Math.round(data.price * (1 - discount / 100))
            : data.price;

          let badge: string | undefined;
          const tags = data.tags || {};
          if (tags.isNew) badge = 'New';
          else if (tags.isBestseller) badge = 'Bestseller';
          else if (tags.isLimited) badge = 'Limited';
          else if (tags.isBestSale) badge = 'Sale';

          return {
            id: doc.id,
            name: data.name,
            price: finalPrice,
            originalPrice: discount > 0 ? data.price : undefined,
            image: data.images?.[0]?.url || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
            alt: data.images?.[0]?.alt || data.name,
            badge,
            rating: 4.8,
            reviewCount: 0,
          };
        });

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading) {
    return (
      <section className={`py-16 lg:py-20 bg-muted/20 ${className}`}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <div className="h-6 bg-muted rounded animate-pulse w-32 mx-auto mb-3" />
            <div className="h-10 bg-muted rounded animate-pulse w-64 mx-auto mb-3" />
            <div className="h-5 bg-muted rounded animate-pulse w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card rounded-xl overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                  <div className="h-5 bg-muted rounded animate-pulse w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={`py-16 lg:py-20 bg-muted/20 ${className}`}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Products
            </h2>
            <p className="font-body text-base text-muted-foreground">
              No products available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 lg:py-20 bg-muted/20 ${className}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Trending Now
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked trending bags from the best brands worldwide
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product-detail?id=${product.id}`}
              className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badges */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium">
                    {product.badge}
                  </div>
                )}

                {product.originalPrice && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-accent text-accent-foreground rounded text-xs font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Quick action */}
                <button
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon name="HeartIcon" size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-body text-sm lg:text-base font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      variant={i < Math.floor(product.rating) ? 'solid' : 'outline'}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground/30'}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-base lg:text-lg font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <a
            href="/product-listing"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body text-base font-medium transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
