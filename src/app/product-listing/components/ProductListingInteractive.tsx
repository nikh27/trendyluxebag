'use client';

import React, { useState, useEffect } from 'react';
import SearchFilter from '@/components/common/SearchFilter';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import FilterSummary from './FilterSummary';
import Icon from '@/components/ui/AppIcon';
import { getAllProducts } from '@/services/productService';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [gridSize, setGridSize] = useState<'2-col' | '4-col'>('2-col');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    sortBy: 'featured',
    searchQuery: '',
    tags: []
  });

  // Fetch products from Firestore
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();

        console.log('📦 Fetched products from Firestore:', data.length);

        // Transform and filter active products
        const transformedProducts = data
          .filter(p => p.status === 'active')
          .map(p => ({
            id: p.id,
            name: p.name,
            price: p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price,
            originalPrice: p.discount ? p.price : undefined,
            image: p.images[0]?.url || '',
            alt: p.images[0]?.alt || p.name,
            category: p.category,
            isNew: p.tags?.isNew || p.isNew,
            isBestseller: p.tags?.isBestseller || p.isBestseller,
            isLimited: p.tags?.isLimited || p.isLimited,
            isBestSale: p.tags?.isBestSale || p.isBestSale,
            createdAt: p.createdAt,
            popularity: 85 // TODO: Add to schema
          }));

        console.log('✅ Active products:', transformedProducts.length);
        setProducts(transformedProducts);
      } catch (error) {
        console.error('❌ Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

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

  const filteredProducts = filterProducts(products);

  // Generate categories from products
  const categoryOptions = React.useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([id, count]) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      count
    }));
  }, [products]);

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
        <SearchFilter
          onFilterChange={handleFilterChange}
          categories={categoryOptions}
        />
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