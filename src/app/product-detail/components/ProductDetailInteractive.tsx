'use client';

import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';
import RelatedProducts from './RelatedProducts';
import Icon from '@/components/ui/AppIcon';
import { useFavorites } from '@/contexts/FavoritesContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  specifications: Array<{ label: string; value: string }>;
  images: Array<{ url: string; alt: string }>;
  tags?: {
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
  };
  link?: string;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  category: string;
}

interface ProductDetailInteractiveProps {
  product: Product;
  relatedProducts: RelatedProduct[];
}

const ProductDetailInteractive = ({
  product,
  relatedProducts,
}: ProductDetailInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleAddToCart = () => {
    if (!isHydrated) return;
    console.log('Added to cart:', product.id);
  };

  const handleBuyNow = () => {
    if (!isHydrated) return;
    console.log('Buy now:', product.id);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-muted rounded-luxury animate-pulse" />
            <div className="space-y-6">
              <div className="h-12 bg-muted rounded-luxury animate-pulse" />
              <div className="h-8 bg-muted rounded-luxury animate-pulse w-1/2" />
              <div className="h-32 bg-muted rounded-luxury animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Product Detail Section */}
      <section className="bg-background py-8 lg:py-12">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              <ProductInfo
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating}
                reviewCount={product.reviewCount}
                description={product.description}
                highlights={product.highlights}
                specifications={product.specifications}
                tags={product.tags}
              />

              <ProductActions
                productId={product.id}
                productLink={product.link}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:hidden z-50 safe-bottom">
        <div className="flex gap-3">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`flex-1 h-12 px-4 ${isFavorite(product.id) ? 'bg-accent/10 text-accent' : 'bg-muted text-foreground'
              } rounded-luxury font-body text-sm font-medium transition-luxury hover:bg-muted/80 active:scale-[0.97] flex items-center justify-center gap-2`}
          >
            <Icon
              name="HeartIcon"
              size={20}
              variant={isFavorite(product.id) ? 'solid' : 'outline'}
            />
            <span>Wishlist</span>
          </button>
          <button
            onClick={() => {
              const link = product.link;
              console.log('🔗 Mobile Buy Now clicked. Link:', link);
              if (link) {
                window.open(link, '_blank', 'noopener,noreferrer');
              }
            }}
            disabled={!product.link}
            className="flex-1 h-12 px-6 bg-accent text-accent-foreground rounded-luxury font-body text-sm font-medium transition-spring hover:shadow-luxury active:scale-[0.97] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Icon name="BoltIcon" size={20} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailInteractive;