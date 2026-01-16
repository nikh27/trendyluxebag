'use client';

import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import ProductActions from './ProductActions';
import RelatedProducts from './RelatedProducts';

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
              />
              
              <ProductActions
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </>
  );
};

export default ProductDetailInteractive;