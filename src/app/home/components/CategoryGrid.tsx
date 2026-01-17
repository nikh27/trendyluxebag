import CategoryCard from './CategoryCard';

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
  // Static categories with Unsplash images for better performance
  const categories: Category[] = [
    {
      id: 'tote',
      name: 'Tote Bags',
      description: 'Spacious & Versatile',
      image: "https://images.unsplash.com/photo-1713425888055-5d75dc587692",
      alt: 'Elegant brown leather tote bag with structured design',
      productCount: 45
    },
    {
      id: 'clutch',
      name: 'Clutches',
      description: 'Evening Elegance',
      image: "https://images.unsplash.com/photo-1603448957837-8ab1952e28e7",
      alt: 'Sophisticated black leather clutch with gold chain detail',
      productCount: 32
    },
    {
      id: 'shoulder',
      name: 'Shoulder Bags',
      description: 'Classic & Timeless',
      image: "https://images.unsplash.com/photo-1701792606084-10fbd4a9eed1",
      alt: 'Luxurious camel leather shoulder bag with adjustable strap',
      productCount: 58
    },
    {
      id: 'crossbody',
      name: 'Crossbody',
      description: 'Hands-Free Style',
      image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
      alt: 'Compact burgundy crossbody bag with gold hardware',
      productCount: 41
    },
    {
      id: 'backpack',
      name: 'Backpacks',
      description: 'Modern & Functional',
      image: "https://images.unsplash.com/photo-1615175107439-4bce24429692",
      alt: 'Sleek black leather backpack with minimalist design',
      productCount: 28
    },
    {
      id: 'travel',
      name: 'Travel Bags',
      description: 'Adventure Ready',
      image: "https://images.unsplash.com/photo-1648465234633-2322de3766ad",
      alt: 'Large tan leather weekender bag with brass hardware',
      productCount: 36
    }
  ];

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every occasion and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) =>
            <CategoryCard
              key={category.id}
              {...category}
              href={`/product-listing?category=${encodeURIComponent(category.name)}`} />

          )}
        </div>
      </div>
    </section>);

};

export default CategoryGrid;