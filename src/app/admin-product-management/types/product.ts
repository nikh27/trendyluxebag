// Shared Product type for admin product management components
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    discount?: number;
    status: 'active' | 'draft' | 'archived';
    image: string;
    alt: string;
    description: string;
    images: Array<{ url: string; alt: string; isPrimary?: boolean; displayOrder?: number; }>;
    productLink?: string;
    link?: string; // Alias for productLink for backward compatibility
    highlights?: string[];
    keyHighlights?: string[];
    specifications?: Record<string, string>;
    tags?: {
        isNew?: boolean;
        isBestseller?: boolean;
        isLimited?: boolean;
        isBestSale?: boolean;
    };
    // Legacy fields for backward compatibility
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
    createdAt: string;
    updatedAt?: string;
}
