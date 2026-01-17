import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

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
      className="group relative h-80 rounded-luxury overflow-hidden shadow-luxury-sm transition-luxury hover:shadow-luxury"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <AppImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-luxury group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <h3 className="font-heading text-2xl font-bold text-white mb-2">
          {name}
        </h3>
        <p className="font-body text-white/90 mb-2">
          {description}
        </p>
        <p className="caption text-white/70">
          {productCount} Products
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
