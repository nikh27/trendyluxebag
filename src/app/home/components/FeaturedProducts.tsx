'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { collection, query, orderBy, limit, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
        // Query latest products (filter in code to avoid index requirement)
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          orderBy('createdAt', 'desc'),
          limit(3)
        );

        const querySnapshot = await getDocs(q);
        console.log('📦 Fetched latest products:', querySnapshot.size);

        const fetchedProducts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const discount = data.discount || 0;
          const finalPrice = discount > 0
            ? Math.round(data.price * (1 - discount / 100))
            : data.price;

          // Determine badge
          let badge: string | undefined;
          const tags = data.tags || {};
          if (tags.isNew) badge = 'New Arrival';
          else if (tags.isBestseller) badge = 'Bestseller';
          else if (tags.isLimited) badge = 'Limited Edition';
          else if (tags.isBestSale) badge = 'Best Sale';

          return {
            id: doc.id,
            name: data.name,
            price: finalPrice,
            originalPrice: discount > 0 ? data.price : undefined,
            image: data.images?.[0]?.url || 'https://images.unsplash.com/photo-1557156975-10facf485d07',
            alt: data.images?.[0]?.alt || data.name,
            badge,
            rating: 4.8, // TODO: Add to schema
            reviewCount: 0, // TODO: Add to schema
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
      <section className={`py-16 lg:py-24 bg-muted/30 ${className}`}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Latest Collection
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-background rounded-luxury animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={`py-16 lg:py-24 bg-muted/30 ${className}`}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Latest Collection
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              No products available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 lg:py-24 bg-muted/30 ${className}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our newest arrivals - fresh styles added just for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              href={`/product-detail?id=${product.id}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/product-listing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97]"
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