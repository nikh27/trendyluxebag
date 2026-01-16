'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '@/contexts/FavoritesContext';
import ProductCard from '@/app/product-listing/components/ProductCard';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

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

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Classic Leather Tote Bag',
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
      alt: 'Brown leather tote bag with gold hardware on white background',
      category: 'tote',
      isNew: true,
      isBestseller: true,
      isBestSale: true,
      createdAt: '2026-01-10',
      popularity: 95
    },
    {
      id: '2',
      name: 'Evening Satin Clutch',
      price: 149.99,
      image: "https://images.unsplash.com/photo-1614522118808-bf3a6cd2e005",
      alt: 'Black satin clutch with silver chain strap on marble surface',
      category: 'clutch',
      isBestseller: true,
      createdAt: '2026-01-08',
      popularity: 88
    },
    {
      id: '3',
      name: 'Crossbody Messenger Bag',
      price: 189.99,
      originalPrice: 249.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea9e9cac-1768007414365.png",
      alt: 'Tan crossbody messenger bag with adjustable strap on wooden table',
      category: 'crossbody',
      isNew: true,
      isBestSale: true,
      createdAt: '2026-01-12',
      popularity: 82
    },
    {
      id: '4',
      name: 'Luxury Shoulder Handbag',
      price: 449.99,
      image: "https://images.unsplash.com/photo-1641812746933-b1b8d2ac8ba9",
      alt: 'Burgundy leather shoulder bag with gold chain detail',
      category: 'shoulder',
      isBestseller: true,
      isLimited: true,
      createdAt: '2026-01-05',
      popularity: 91
    },
    {
      id: '5',
      name: 'Travel Backpack Premium',
      price: 279.99,
      originalPrice: 349.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_184181d74-1768150129371.png",
      alt: 'Black leather backpack with multiple compartments on gray background',
      category: 'backpack',
      isNew: true,
      createdAt: '2026-01-14',
      popularity: 79
    },
    {
      id: '6',
      name: 'Mini Crossbody Purse',
      price: 129.99,
      image: "https://images.unsplash.com/photo-1617958008526-678b6353a092",
      alt: 'Pink mini crossbody purse with gold chain on white surface',
      category: 'crossbody',
      createdAt: '2026-01-06',
      popularity: 75
    },
    {
      id: '7',
      name: 'Designer Tote Collection',
      price: 599.99,
      image: "https://images.unsplash.com/photo-1680789526738-7fcfd4a093c9",
      alt: 'Beige designer tote bag with leather handles and gold logo',
      category: 'tote',
      isBestseller: true,
      isLimited: true,
      createdAt: '2026-01-03',
      popularity: 93
    },
    {
      id: '8',
      name: 'Crystal Evening Clutch',
      price: 199.99,
      originalPrice: 279.99,
      image: "https://images.unsplash.com/photo-1608368553807-622b422ee2c0",
      alt: 'Silver crystal-embellished evening clutch on black velvet',
      category: 'clutch',
      isNew: true,
      isBestSale: true,
      createdAt: '2026-01-15',
      popularity: 86
    },
    {
      id: '9',
      name: 'Everyday Shoulder Bag',
      price: 219.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_17143f34b-1767994862727.png",
      alt: 'Navy blue shoulder bag with adjustable strap on wooden background',
      category: 'shoulder',
      createdAt: '2026-01-07',
      popularity: 77
    },
    {
      id: '10',
      name: 'Urban Backpack Style',
      price: 249.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12367e09c-1766973296429.png",
      alt: 'Gray urban backpack with laptop compartment on concrete floor',
      category: 'backpack',
      isNew: true,
      createdAt: '2026-01-11',
      popularity: 81
    },
    {
      id: '11',
      name: 'Vintage Leather Tote',
      price: 379.99,
      originalPrice: 479.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea9e9cac-1768007414365.png",
      alt: 'Brown vintage leather tote with brass buckles on rustic table',
      category: 'tote',
      isBestseller: true,
      isBestSale: true,
      createdAt: '2026-01-04',
      popularity: 89
    },
    {
      id: '12',
      name: 'Metallic Party Clutch',
      price: 169.99,
      image: "https://images.unsplash.com/photo-1630534592550-bc740a0c5704",
      alt: 'Gold metallic party clutch with chain strap on pink background',
      category: 'clutch',
      isLimited: true,
      createdAt: '2026-01-09',
      popularity: 73
    }
  ];

  const favoriteProducts = allProducts.filter((product) =>
    favorites.includes(product.id)
  );

  if (!isHydrated) {
    return null;
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