'use client';

import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

interface SearchFilterProps {
    onFilterChange?: (filters: FilterState) => void;
    onSearchChange?: (query: string) => void;
    className?: string;
}

interface FilterState {
    categories: string[];
    priceRange: [number, number];
    sortBy: string;
    searchQuery: string;
    tags: string[];
}

const SearchFilter = ({
    onFilterChange,
    onSearchChange,
    className = '',
}: SearchFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [sortBy, setSortBy] = useState('featured');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const categories: FilterOption[] = [
        { id: 'tote', label: 'Tote Bags', count: 45 },
        { id: 'clutch', label: 'Clutches', count: 32 },
        { id: 'shoulder', label: 'Shoulder Bags', count: 58 },
        { id: 'crossbody', label: 'Crossbody', count: 41 },
        { id: 'backpack', label: 'Backpacks', count: 28 },
    ];

    const tags: FilterOption[] = [
        { id: 'new', label: 'New Arrivals' },
        { id: 'bestseller', label: 'Bestseller' },
        { id: 'bestsale', label: 'Best Sale' },
        { id: 'limited', label: 'Limited Edition' },
    ];

    const sortOptions: FilterOption[] = [
        { id: 'featured', label: 'Featured' },
        { id: 'price-low', label: 'Price: Low to High' },
        { id: 'price-high', label: 'Price: High to Low' },
        { id: 'newest', label: 'Newest Arrivals' },
        { id: 'popular', label: 'Most Popular' },
    ];

    useEffect(() => {
        const filters: FilterState = {
            categories: selectedCategories,
            priceRange,
            sortBy,
            searchQuery,
            tags: selectedTags,
        };
        onFilterChange?.(filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategories, priceRange, sortBy, searchQuery, selectedTags]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearchChange?.(query);
    };

    const handleCategoryToggle = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleTagToggle = (tagId: string) => {
        setSelectedTags((prev) =>
            prev.includes(tagId)
                ? prev.filter((id) => id !== tagId)
                : [...prev, tagId]
        );
    };

    const handlePriceRangeChange = (
        index: number,
        value: string
    ) => {
        const numValue = parseInt(value) || 0;
        setPriceRange((prev) => {
            const newRange: [number, number] = [...prev];
            newRange[index] = numValue;
            return newRange;
        });
    };

    const handleSortChange = (sortId: string) => {
        setSortBy(sortId);
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 5000]);
        setSortBy('featured');
        setSearchQuery('');
        setSelectedTags([]);
    };

    const activeFilterCount =
        selectedCategories.length +
        (priceRange[0] !== 0 || priceRange[1] !== 5000 ? 1 : 0) +
        (sortBy !== 'featured' ? 1 : 0) +
        selectedTags.length;

    return (
        <div className={`${className}`}>
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full p-4 bg-card rounded-luxury shadow-luxury-sm transition-luxury hover:shadow-luxury"
                >
                    <div className="flex items-center gap-3">
                        <Icon name="AdjustmentsHorizontalIcon" size={24} />
                        <span className="font-body text-base font-medium">
                            Filters & Sort
                        </span>
                        {activeFilterCount > 0 && (
                            <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full caption font-medium">
                                {activeFilterCount}
                            </span>
                        )}
                    </div>
                    <Icon
                        name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                        size={20}
                    />
                </button>
            </div>

            {/* Filter Panel */}
            <div
                className={`${isOpen ? 'block' : 'hidden'
                    } lg:block bg-card rounded-luxury p-6 shadow-luxury-sm space-y-8`}
            >
                {/* Search */}
                <div>
                    <label
                        htmlFor="search"
                        className="block font-body text-sm font-medium mb-3"
                    >
                        Search Products
                    </label>
                    <div className="relative">
                        <Icon
                            name="MagnifyingGlassIcon"
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                            id="search"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search luxury bags..."
                            className="w-full h-12 pl-12 pr-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="font-body text-sm font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <label
                                key={category.id}
                                className="flex items-center gap-3 p-3 rounded-luxury transition-luxury hover:bg-muted cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryToggle(category.id)}
                                    className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring transition-luxury"
                                />
                                <span className="flex-1 font-body text-sm">
                                    {category.label}
                                </span>
                                <span className="caption text-muted-foreground">
                                    {category.count}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Product Tags */}
                <div>
                    <h3 className="font-body text-sm font-medium mb-3">Product Tags</h3>
                    <div className="space-y-2">
                        {tags.map((tag) => (
                            <label
                                key={tag.id}
                                className="flex items-center gap-3 p-3 rounded-luxury transition-luxury hover:bg-muted cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedTags.includes(tag.id)}
                                    onChange={() => handleTagToggle(tag.id)}
                                    className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring transition-luxury"
                                />
                                <span className="flex-1 font-body text-sm">
                                    {tag.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h3 className="font-body text-sm font-medium mb-3">Price Range</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label htmlFor="price-min" className="caption text-muted-foreground mb-1 block">
                                    Min
                                </label>
                                <input
                                    id="price-min"
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                                    className="w-full h-10 px-3 bg-input border border-border rounded-luxury font-body text-sm transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <span className="text-muted-foreground mt-6">—</span>
                            <div className="flex-1">
                                <label htmlFor="price-max" className="caption text-muted-foreground mb-1 block">
                                    Max
                                </label>
                                <input
                                    id="price-max"
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                                    className="w-full h-10 px-3 bg-input border border-border rounded-luxury font-body text-sm transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>
                        <div className="data-text text-sm text-muted-foreground">
                            ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Sort By */}
                <div>
                    <h3 className="font-body text-sm font-medium mb-3">Sort By</h3>
                    <div className="space-y-2">
                        {sortOptions.map((option) => (
                            <label
                                key={option.id}
                                className="flex items-center gap-3 p-3 rounded-luxury transition-luxury hover:bg-muted cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="sort"
                                    checked={sortBy === option.id}
                                    onChange={() => handleSortChange(option.id)}
                                    className="w-5 h-5 border-border text-primary focus:ring-2 focus:ring-ring transition-luxury"
                                />
                                <span className="font-body text-sm">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                    <button
                        onClick={handleClearFilters}
                        className="w-full h-12 px-6 bg-muted text-foreground rounded-luxury font-body text-sm font-medium transition-luxury hover:bg-muted/80 active:scale-[0.97]"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchFilter;