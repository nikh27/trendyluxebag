'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  productCount: number;
}

interface CategoryGridProps {
  className?: string;
}

const CategoryGrid = ({ className = '' }: CategoryGridProps) => {
  const categories: Category[] = [
    {
      id: 'tote',
      name: 'Tote Bags',
      description: 'Spacious & Versatile',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
      alt: 'Elegant leather tote bag',
      productCount: 45
    },
    {
      id: 'clutch',
      name: 'Clutches',
      description: 'Evening Elegance',
      image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d',
      alt: 'Sophisticated clutch bag',
      productCount: 32
    },
    {
      id: 'shoulder',
      name: 'Shoulder Bags',
      description: 'Classic & Timeless',
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e',
      alt: 'Luxurious shoulder bag',
      productCount: 58
    },
    {
      id: 'crossbody',
      name: 'Crossbody',
      description: 'Hands-Free Style',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
      alt: 'Compact crossbody bag',
      productCount: 41
    },
    {
      id: 'backpack',
      name: 'Backpacks',
      description: 'Modern & Functional',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
      alt: 'Sleek leather backpack',
      productCount: 28
    },
    {
      id: 'travel',
      name: 'Travel Bags',
      description: 'Adventure Ready',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      alt: 'Large weekender travel bag',
      productCount: 36
    }
  ];

  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Explore Collections
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trending bags from top brands worldwide
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/product-listing?category=${encodeURIComponent(category.name)}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden"
            >
              {/* Background Image */}
              <AppImage
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                <span className="inline-block w-fit px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs text-white/90 font-medium mb-2">
                  {category.productCount} Items
                </span>
                <h3 className="font-heading text-lg lg:text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="font-body text-sm text-white/80 hidden sm:block">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
