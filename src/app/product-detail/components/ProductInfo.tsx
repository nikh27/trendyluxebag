import Icon from '@/components/ui/AppIcon';

interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  specifications: Array<{ label: string; value: string }>;
  tags?: {
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
  };
}

const ProductInfo = ({
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  description,
  highlights,
  specifications,
  tags,
}: ProductInfoProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div>
        <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-2">
          {name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                variant={i < Math.floor(rating) ? 'solid' : 'outline'}
                size={20}
                className={i < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="caption text-muted-foreground">
            {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-heading text-4xl font-semibold text-foreground">
          ₹{price.toLocaleString()}
        </span>
        {originalPrice && (
          <>
            <span className="font-body text-xl text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full caption font-medium">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Tags */}
      {tags && (tags.isNew || tags.isBestseller || tags.isLimited || tags.isBestSale) && (
        <div className="flex flex-wrap gap-2">
          {tags.isNew && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full caption font-medium">
              New Arrival
            </span>
          )}
          {tags.isBestseller && (
            <span className="px-3 py-1 bg-success/10 text-success rounded-full caption font-medium">
              Bestseller
            </span>
          )}
          {tags.isLimited && (
            <span className="px-3 py-1 bg-error/10 text-error rounded-full caption font-medium">
              Limited Edition
            </span>
          )}
          {tags.isBestSale && (
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full caption font-medium">
              Best Sale
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <div className="pt-4 border-t border-border">
        <h2 className="font-body text-lg font-semibold mb-3">Description</h2>
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Highlights */}
      <div className="pt-4 border-t border-border">
        <h2 className="font-body text-lg font-semibold mb-3">Key Highlights</h2>
        <ul className="space-y-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <Icon name="CheckCircleIcon" size={20} className="text-success mt-0.5 flex-shrink-0" />
              <span className="font-body text-base text-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Specifications */}
      <div className="pt-4 border-t border-border">
        <h2 className="font-body text-lg font-semibold mb-3">Specifications</h2>
        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="font-body text-base text-muted-foreground">
                {spec.label}
              </span>
              <span className="font-body text-base text-foreground font-medium">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Assurance */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-muted rounded-luxury">
            <Icon name="CheckBadgeIcon" size={24} className="text-primary" />
            <div>
              <div className="font-body text-sm font-medium">Authentic Product</div>
              <div className="caption text-muted-foreground">100% Genuine</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-muted rounded-luxury">
            <Icon name="StarIcon" variant="solid" size={24} className="text-accent" />
            <div>
              <div className="font-body text-sm font-medium">Top Quality</div>
              <div className="caption text-muted-foreground">Premium brands</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;