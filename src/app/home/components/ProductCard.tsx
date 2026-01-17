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
    href,
}: ProductCardProps) => {
    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <Link
            href={href}
            className="group bg-card rounded-luxury overflow-hidden shadow-luxury-sm transition-luxury hover:shadow-luxury"
        >
            {/* Product Image */}
            <div className="relative aspect-square bg-muted overflow-hidden">
                <AppImage
                    src={image}
                    alt={alt}
                    className="w-full h-full object-cover transition-luxury group-hover:scale-105"
                />
                {badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full caption font-medium">
                        {badge}
                    </div>
                )}
                {discount > 0 && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground rounded-full caption font-medium">
                        {discount}% OFF
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-2">
                <h3 className="font-body text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-luxury">
                    {name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Icon
                            key={i}
                            name="StarIcon"
                            variant={i < Math.floor(rating) ? 'solid' : 'outline'}
                            size={16}
                            className={i < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
                        />
                    ))}
                    <span className="caption text-muted-foreground ml-1">
                        {rating.toFixed(1)}
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                    <span className="font-body text-lg font-semibold text-foreground">
                        ₹{price.toLocaleString()}
                    </span>
                    {originalPrice && (
                        <span className="caption text-muted-foreground line-through">
                            ₹{originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
