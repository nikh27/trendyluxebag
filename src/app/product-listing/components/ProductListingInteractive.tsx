'use client';

import { useState, useEffect } from 'react';
import SearchFilter from '@/components/common/SearchFilter';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import FilterSummary from './FilterSummary';
import Icon from '@/components/ui/AppIcon';

interface Product {
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
  createdAt: string;
  popularity: number;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
  searchQuery: string;
  tags: string[];
}

const ProductListingInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gridSize, setGridSize] = useState<'2-col' | '4-col'>('2-col');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    sortBy: 'featured',
    searchQuery: '',
    tags: []
  });

  useEffect(() => {
    setIsHydrated(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Classic Leather Tote Bag',
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
      alt: 'Brown leather tote bag with gold hardware on white background',
      category: 'tote',
      isNew: true,
      isBestseller: true,
      isBestSale: true,
      createdAt: '2026-01-10',
      popularity: 95
    },
    {
      id: '2',
      name: 'Evening Satin Clutch',
      price: 149.99,
      image: "https://images.unsplash.com/photo-1614522118808-bf3a6cd2e005",
      alt: 'Black satin clutch with silver chain strap on marble surface',
      category: 'clutch',
      isBestseller: true,
      createdAt: '2026-01-08',
      popularity: 88
    },
    {
      id: '3',
      name: 'Crossbody Messenger Bag',
      price: 189.99,
      originalPrice: 249.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea9e9cac-1768007414365.png",
      alt: 'Tan crossbody messenger bag with adjustable strap on wooden table',
      category: 'crossbody',
      isNew: true,
      isBestSale: true,
      createdAt: '2026-01-12',
      popularity: 82
    },
    {
      id: '4',
      name: 'Luxury Shoulder Handbag',
      price: 449.99,
      image: "https://images.unsplash.com/photo-1641812746933-b1b8d2ac8ba9",
      alt: 'Burgundy leather shoulder bag with gold chain detail',
      category: 'shoulder',
      isBestseller: true,
      isLimited: true,
      createdAt: '2026-01-05',
      popularity: 91
    },
    {
      id: '5',
      name: 'Travel Backpack Premium',
      price: 279.99,
      originalPrice: 349.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_184181d74-1768150129371.png",
      alt: 'Black leather backpack with multiple compartments on gray background',
      category: 'backpack',
      isNew: true,
      createdAt: '2026-01-14',
      popularity: 79
    },
    {
      id: '6',
      name: 'Mini Crossbody Purse',
      price: 129.99,
      image: "https://images.unsplash.com/photo-1617958008526-678b6353a092",
      alt: 'Pink mini crossbody purse with gold chain on white surface',
      category: 'crossbody',
      createdAt: '2026-01-06',
      popularity: 75
    },
    {
      id: '7',
      name: 'Designer Tote Collection',
      price: 599.99,
      image: "https://images.unsplash.com/photo-1680789526738-7fcfd4a093c9",
      alt: 'Beige designer tote bag with leather handles and gold logo',
      category: 'tote',
      isBestseller: true,
      isLimited: true,
      createdAt: '2026-01-03',
      popularity: 93
    },
    {
      id: '8',
      name: 'Crystal Evening Clutch',
      price: 199.99,
      originalPrice: 279.99,
      image: "https://images.unsplash.com/photo-1608368553807-622b422ee2c0",
      alt: 'Silver crystal-embellished evening clutch on black velvet',
      category: 'clutch',
      isNew: true,
      isBestSale: true,
      createdAt: '2026-01-15',
      popularity: 86
    },
    {
      id: '9',
      name: 'Everyday Shoulder Bag',
      price: 219.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_17143f34b-1767994862727.png",
      alt: 'Navy blue shoulder bag with adjustable strap on wooden background',
      category: 'shoulder',
      createdAt: '2026-01-07',
      popularity: 77
    },
    {
      id: '10',
      name: 'Urban Backpack Style',
      price: 249.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12367e09c-1766973296429.png",
      alt: 'Gray urban backpack with laptop compartment on concrete floor',
      category: 'backpack',
      isNew: true,
      createdAt: '2026-01-11',
      popularity: 81
    },
    {
      id: '11',
      name: 'Vintage Leather Tote',
      price: 379.99,
      originalPrice: 479.99,
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea9e9cac-1768007414365.png",
      alt: 'Brown vintage leather tote with brass buckles on rustic table',
      category: 'tote',
      isBestseller: true,
      isBestSale: true,
      createdAt: '2026-01-04',
      popularity: 89
    },
    {
      id: '12',
      name: 'Metallic Party Clutch',
      price: 169.99,
      image: "https://images.unsplash.com/photo-1630534592550-bc740a0c5704",
      alt: 'Gold metallic party clutch with chain strap on pink background',
      category: 'clutch',
      isLimited: true,
      createdAt: '2026-01-09',
      popularity: 73
    }];


  const filterProducts = (products: Product[]): Product[] => {
    let filtered = [...products];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((p) => {
        return filters.tags.every((tag) => {
          if (tag === 'new') return p.isNew;
          if (tag === 'bestseller') return p.isBestseller;
          if (tag === 'limited') return p.isLimited;
          if (tag === 'bestsale') return p.isBestSale;
          return true;
        });
      });
    }

    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popular':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setIsLoading(true);
    setFilters(newFilters);
    setTimeout(() => setIsLoading(false), 400);
  };

  const handleClearFilter = (filterType: string, value?: string) => {
    setIsLoading(true);
    const newFilters = { ...filters };

    switch (filterType) {
      case 'category':
        if (value) {
          newFilters.categories = newFilters.categories.filter(
            (c) => c !== value
          );
        }
        break;
      case 'price':
        newFilters.priceRange = [0, 5000];
        break;
      case 'sort':
        newFilters.sortBy = 'featured';
        break;
      case 'tag':
        if (value) {
          newFilters.tags = newFilters.tags.filter((t) => t !== value);
        }
        break;
      case 'all':
        newFilters.categories = [];
        newFilters.priceRange = [0, 5000];
        newFilters.sortBy = 'featured';
        newFilters.tags = [];
        break;
    }

    setFilters(newFilters);
    setTimeout(() => setIsLoading(false), 400);
  };

  const filteredProducts = filterProducts(mockProducts);

  const getGridColumns = () => {
    switch (gridSize) {
      case '2-col':
        return 'grid-cols-1 sm:grid-cols-2';
      case '4-col':
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
      default:
        return 'grid-cols-1 sm:grid-cols-2';
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-80 flex-shrink-0">
          <div className="bg-card rounded-luxury p-6 shadow-luxury-sm animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="lg:w-80 flex-shrink-0">
        <SearchFilter onFilterChange={handleFilterChange} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header with Grid Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              Luxury Bags Collection
            </h1>
            <p className="font-body text-base text-muted-foreground mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Grid Size Selector */}
          <div className="flex items-center gap-2 bg-card rounded-luxury p-1 shadow-luxury-sm">
            <button
              onClick={() => setGridSize('2-col')}
              className={`p-2 rounded-lg transition-luxury ${gridSize === '2-col' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              aria-label="2 columns"
            >
              <Icon name="Squares2X2Icon" size={20} />
            </button>
            <button
              onClick={() => setGridSize('4-col')}
              className={`p-2 rounded-lg transition-luxury ${gridSize === '4-col' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              aria-label="4 columns"
            >
              <Icon name="Squares2X2Icon" size={24} />
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        <FilterSummary
          filters={filters}
          onClearFilter={handleClearFilter}
          resultCount={filteredProducts.length}
        />

        {/* Products Grid */}
        {isLoading ? (
          <div className={`grid ${getGridColumns()} gap-6`}>
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={`grid ${getGridColumns()} gap-6`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Icon
              name="MagnifyingGlassIcon"
              size={64}
              className="text-muted-foreground mb-4"
            />
            <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="font-body text-base text-muted-foreground text-center max-w-md mb-6">
              We couldn't find any products matching your filters. Try adjusting
              your search criteria.
            </p>
            <button
              onClick={() => handleClearFilter('all')}
              className="h-12 px-6 bg-primary text-primary-foreground rounded-luxury font-body text-sm font-medium transition-spring hover:shadow-luxury active:scale-[0.97]"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListingInteractive;