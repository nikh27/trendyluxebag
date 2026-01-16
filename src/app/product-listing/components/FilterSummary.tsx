'use client';

import Icon from '@/components/ui/AppIcon';

interface FilterSummaryProps {
    filters: {
        categories: string[];
        priceRange: [number, number];
        sortBy: string;
        tags: string[];
    };
    onClearFilter: (filterType: string, value?: string) => void;
    resultCount: number;
}

const FilterSummary = ({
    filters,
    onClearFilter,
    resultCount,
}: FilterSummaryProps) => {
    const categoryLabels: Record<string, string> = {
        tote: 'Tote Bags',
        clutch: 'Clutches',
        shoulder: 'Shoulder Bags',
        crossbody: 'Crossbody',
        backpack: 'Backpacks',
    };

    const tagLabels: Record<string, string> = {
        new: 'New Arrivals',
        bestseller: 'Bestseller',
        bestsale: 'Best Sale',
        limited: 'Limited Edition',
    };

    const sortLabels: Record<string, string> = {
        'price-low': 'Price: Low to High',
        'price-high': 'Price: High to Low',
        newest: 'Newest First',
        popular: 'Most Popular',
        featured: 'Featured',
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.priceRange[0] !== 0 ||
        filters.priceRange[1] !== 5000 ||
        filters.tags.length > 0;

    return (
        <div className="bg-card rounded-luxury p-4 shadow-luxury-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h2 className="font-body text-lg font-semibold">
                        {resultCount} Products
                    </h2>
                    {hasActiveFilters && (
                        <span className="px-2 py-1 bg-accent/10 text-accent rounded-full caption text-xs font-medium">
                            Filtered
                        </span>
                    )}
                </div>
            </div>

            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                    {filters.categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onClearFilter('category', category)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-luxury font-body text-sm transition-luxury hover:bg-primary/20"
                        >
                            <span>{categoryLabels[category] || category}</span>
                            <Icon name="XMarkIcon" size={16} />
                        </button>
                    ))}

                    {filters.tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => onClearFilter('tag', tag)}
                            className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-luxury font-body text-sm transition-luxury hover:bg-accent/20"
                        >
                            <span>{tagLabels[tag] || tag}</span>
                            <Icon name="XMarkIcon" size={16} />
                        </button>
                    ))}

                    {(filters.priceRange[0] !== 0 ||
                        filters.priceRange[1] !== 5000) && (
                            <button
                                onClick={() => onClearFilter('price')}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full caption text-sm font-medium transition-luxury hover:bg-primary/20 active:scale-95"
                            >
                                <span>
                                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                                </span>
                                <Icon name="XMarkIcon" size={14} />
                            </button>
                        )}

                    {filters.sortBy !== 'featured' && (
                        <button
                            onClick={() => onClearFilter('sort')}
                            className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full caption text-sm font-medium transition-luxury hover:bg-primary/20 active:scale-95"
                        >
                            <span>{sortLabels[filters.sortBy]}</span>
                            <Icon name="XMarkIcon" size={14} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterSummary;