'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  href: string;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  alt,
  badge,
  rating,
  reviewCount,
  href,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Link
      href={href}
      className="group block bg-card rounded-luxury overflow-hidden shadow-luxury-sm transition-luxury hover:shadow-luxury hover:-translate-y-1"
    >
      <div className="relative h-80 overflow-hidden">
        <AppImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-luxury group-hover:scale-105"
        />
        {badge && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent text-accent-foreground rounded-full caption font-medium shadow-luxury-sm">
            {badge}
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-error text-error-foreground rounded-full caption font-medium shadow-luxury-sm">
            -{discount}%
          </div>
        )}
        <button
          className="absolute bottom-4 right-4 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-luxury opacity-0 group-hover:opacity-100 hover:bg-card active:scale-90"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Icon name="HeartIcon" size={20} />
        </button>
      </div>
      
      <div className="p-6 space-y-3">
        <h3 className="font-body text-lg font-medium text-foreground line-clamp-2 min-h-[3.5rem]">
          {name}
        </h3>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={16}
                variant={i < Math.floor(rating) ? 'solid' : 'outline'}
                className={i < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="caption text-muted-foreground">
            ({reviewCount})
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-heading text-2xl font-semibold text-foreground">
            ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          {originalPrice && (
            <span className="font-body text-base text-muted-foreground line-through">
              ${originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;