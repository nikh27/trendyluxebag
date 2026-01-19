'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useFavorites } from '@/contexts/FavoritesContext';
import { getCurrentUser } from '@/services/authService';

interface ProductActionsProps {
  productId: string;
  productLink?: string;
}

const ProductActions = ({ productId, productLink }: ProductActionsProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted rounded-luxury animate-pulse" />
      </div>
    );
  }

  const handleWishlistToggle = async () => {
    await toggleFavorite(productId);
  };

  const isInWishlist = isFavorite(productId);

  const handleBuyNow = () => {
    // Check if user is authenticated
    const currentUser = getCurrentUser();

    if (!currentUser) {
      // Not authenticated - redirect to signup with return URL
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/signup?returnUrl=${returnUrl}`);
      return;
    }

    // User is authenticated - proceed with buy now
    console.log('🔗 Buy Now clicked. ProductLink:', productLink);
    if (productLink) {
      console.log('✅ Opening link:', productLink);
      window.open(productLink, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('⚠️ No product link available');
    }
  };

  return (
    <div className="space-y-4">
      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        disabled={!productLink}
        className="w-full h-14 px-8 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Icon name="BoltIcon" size={20} />
        <span>Buy Now</span>
      </button>

      {/* Wishlist & Share */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleWishlistToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-luxury transition-luxury ${isInWishlist ? 'bg-accent/10 text-accent' : 'hover:bg-muted'
            }`}
        >
          <Icon
            name="HeartIcon"
            size={20}
            variant={isInWishlist ? 'solid' : 'outline'}
          />
          <span className="font-body text-sm font-medium">
            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </span>
        </button>
        <button
          onClick={async () => {
            try {
              if (navigator.share) {
                await navigator.share({
                  title: document.title,
                  url: window.location.href,
                });
              } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            } catch (error) {
              console.error('Error sharing:', error);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-luxury transition-luxury hover:bg-muted"
        >
          <Icon name="ShareIcon" size={20} />
          <span className="font-body text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

export default ProductActions;