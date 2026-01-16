'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductActions = ({ onAddToCart, onBuyNow }: ProductActionsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-12 bg-muted rounded-luxury animate-pulse" />
        <div className="h-12 bg-muted rounded-luxury animate-pulse" />
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    onAddToCart();
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-body text-base font-medium">Quantity:</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center bg-muted rounded-luxury transition-luxury hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Icon name="MinusIcon" size={20} />
          </button>
          <span className="data-text text-lg font-medium w-12 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
            className="w-10 h-10 flex items-center justify-center bg-muted rounded-luxury transition-luxury hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Icon name="PlusIcon" size={20} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="flex-1 h-14 px-8 bg-muted text-foreground rounded-luxury font-body text-base font-medium transition-luxury hover:bg-muted/80 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAddingToCart ? (
            <>
              <Icon name="CheckCircleIcon" size={20} className="text-success" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <Icon name="ShoppingBagIcon" size={20} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
        <button
          onClick={onBuyNow}
          className="flex-1 h-14 px-8 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97] flex items-center justify-center gap-2"
        >
          <Icon name="BoltIcon" size={20} />
          <span>Buy Now</span>
        </button>
      </div>

      {/* Wishlist & Share */}
      <div className="flex items-center gap-3 pt-2">
        <button className="flex items-center gap-2 px-4 py-2 rounded-luxury transition-luxury hover:bg-muted">
          <Icon name="HeartIcon" size={20} />
          <span className="font-body text-sm font-medium">Add to Wishlist</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-luxury transition-luxury hover:bg-muted">
          <Icon name="ShareIcon" size={20} />
          <span className="font-body text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

export default ProductActions;