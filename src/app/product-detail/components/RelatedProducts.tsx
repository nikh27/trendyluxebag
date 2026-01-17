import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  category: string;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl font-semibold text-foreground">
            You May Also Like
          </h2>
          <Link
            href="/product-listing"
            className="flex items-center gap-2 font-body text-base font-medium text-primary transition-luxury hover:text-primary/80"
          >
            <span>View All</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                href={`/product-detail?id=${product.id}`}
                className="group bg-card rounded-luxury overflow-hidden shadow-luxury-sm transition-luxury hover:shadow-luxury"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <AppImage
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover transition-luxury group-hover:scale-105"
                  />

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discount > 0 && (
                      <div className="px-3 py-1 bg-accent text-accent-foreground rounded-full caption font-medium">
                        {discount}% OFF
                      </div>
                    )}
                    {(product as any).isNew && (
                      <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full caption font-medium">
                        New
                      </div>
                    )}
                    {(product as any).isLimited && (
                      <div className="px-3 py-1 bg-error text-error-foreground rounded-full caption font-medium">
                        Limited
                      </div>
                    )}
                  </div>

                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-luxury opacity-0 group-hover:opacity-100 hover:bg-background"
                    aria-label="Add to wishlist"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Icon name="HeartIcon" size={20} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <div className="caption text-primary font-medium">
                    {product.category}
                  </div>
                  <h3 className="font-body text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-luxury">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="StarIcon"
                        variant={i < Math.floor(product.rating) ? 'solid' : 'outline'}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground'}
                      />
                    ))}
                    <span className="caption text-muted-foreground ml-1">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-body text-lg font-semibold text-foreground">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="caption text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;