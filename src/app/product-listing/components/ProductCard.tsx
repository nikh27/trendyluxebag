'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useFavorites } from '@/contexts/FavoritesContext';
import { formatPKR } from '@/utils/currency';

interface ProductCardProps {
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
}

const ProductCard = ({
    id,
    name,
    price,
    originalPrice,
    image,
    alt,
    category,
    isNew = false,
    isBestseller = false,
    isLimited = false,
    isBestSale = false,
}: ProductCardProps) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isWishlisted = isFavorite(id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
    };

    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <Link
            href={`/product-detail?id=${id}`}
            className="group block bg-card rounded-luxury overflow-hidden shadow-luxury-sm transition-luxury hover:shadow-luxury"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <AppImage
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {isNew && (
                        <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full caption text-xs font-medium shadow-luxury-sm">
                            New
                        </span>
                    )}
                    {isBestseller && (
                        <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full caption text-xs font-medium shadow-luxury-sm">
                            Bestseller
                        </span>
                    )}
                    {isLimited && (
                        <span className="px-3 py-1 bg-warning text-warning-foreground rounded-full caption text-xs font-medium shadow-luxury-sm">
                            Limited
                        </span>
                    )}
                    {isBestSale && discount > 0 && (
                        <span className="px-3 py-1 bg-error text-error-foreground rounded-full caption text-xs font-medium shadow-luxury-sm">
                            Best Sale -{discount}%
                        </span>
                    )}
                    {!isBestSale && discount > 0 && (
                        <span className="px-3 py-1 bg-error text-error-foreground rounded-full caption text-xs font-medium shadow-luxury-sm">
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-luxury hover:bg-background hover:scale-110 active:scale-95"
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <Icon
                        name="HeartIcon"
                        size={20}
                        variant={isWishlisted ? 'solid' : 'outline'}
                        className={isWishlisted ? 'text-error' : 'text-foreground'}
                    />
                </button>

                {/* Quick View Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-luxury">
                    <button className="w-full h-10 bg-primary text-primary-foreground rounded-luxury font-body text-sm font-medium transition-spring hover:shadow-luxury active:scale-[0.97] flex items-center justify-center gap-2">
                        <Icon name="EyeIcon" size={18} />
                        <span>Quick View</span>
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
                <div className="caption text-xs text-muted-foreground uppercase tracking-wider">
                    {category}
                </div>
                <h3 className="font-body text-base font-medium text-foreground line-clamp-2 min-h-[3rem]">
                    {name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="data-text text-lg font-semibold text-foreground">
                        {formatPKR(price)}
                    </span>
                    {originalPrice && (
                        <span className="data-text text-sm text-muted-foreground line-through">
                            {formatPKR(originalPrice)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;