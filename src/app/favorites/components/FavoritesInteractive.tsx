'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import ProductCard from '@/app/product-listing/components/ProductCard';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { getAllProducts } from '@/services/productService';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isLimited?: boolean;
  isBestSale?: boolean;
  createdAt: string;
  popularity: number;
}

const FavoritesInteractive = () => {
  const { favorites } = useFavorites();
  const [isHydrated, setIsHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch products from Firestore
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();

        // Transform products
        const transformedProducts = data.map(p => ({
          id: p.id,
          name: p.name,
          price: p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price,
          originalPrice: p.discount ? p.price : undefined,
          image: p.images[0]?.url || '',
          alt: p.images[0]?.alt || p.name,
          category: p.category,
          isNew: p.isNew,
          isBestseller: p.isBestseller,
          isLimited: p.isLimited,
          isBestSale: p.isBestSale,
          createdAt: p.createdAt,
          popularity: 85
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  if (!isHydrated || loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="h-96 bg-muted rounded-luxury animate-pulse" />
        <div className="h-96 bg-muted rounded-luxury animate-pulse" />
        <div className="h-96 bg-muted rounded-luxury animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-4xl font-semibold text-foreground mb-2">
          My Favorites
        </h1>
        <p className="font-body text-base text-muted-foreground">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
      </div>

      {/* Favorites Grid */}
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Icon name="HeartIcon" size={48} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
            No favorites yet
          </h3>
          <p className="font-body text-base text-muted-foreground text-center max-w-md mb-6">
            Start adding products to your wishlist by clicking the heart icon on any product.
          </p>
          <Link
            href="/product-listing"
            className="h-12 px-6 bg-primary text-primary-foreground rounded-luxury font-body text-sm font-medium transition-spring hover:shadow-luxury active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <Icon name="ShoppingBagIcon" size={20} />
            <span>Browse Products</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesInteractive;