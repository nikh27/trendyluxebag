import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  productCount: number;
  href: string;
}

const CategoryCard = ({
  name,
  description,
  image,
  alt,
  productCount,
  href,
}: CategoryCardProps) => {
  return (
    <Link
      href={href}
      className="group block bg-card rounded-luxury overflow-hidden shadow-luxury-sm transition-luxury hover:shadow-luxury hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-luxury group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-heading text-2xl font-semibold text-white mb-1">
            {name}
          </h3>
          <p className="caption text-white/80 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <span className="data-text text-sm text-white/70">
              {productCount} Products
            </span>
            <div className="flex items-center gap-2 text-accent">
              <span className="font-body text-sm font-medium">Explore</span>
              <Icon name="ArrowRightIcon" size={16} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;