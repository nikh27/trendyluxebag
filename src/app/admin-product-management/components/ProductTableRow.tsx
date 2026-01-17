'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    discount?: number;
    status: 'active' | 'draft' | 'archived';
    image: string;
    alt: string;
    description: string;
    images: Array<{ url: string; alt: string; }>;
    link?: string;
    highlights?: string[];
    specifications?: Record<string, string>;
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
}

interface ProductTableRowProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (productId: string) => void;
    onToggleStatus: (productId: string) => void;
    isSelected?: boolean;
    onToggleSelect?: () => void;
}

const ProductTableRow = ({
    product,
    onEdit,
    onDelete,
    onToggleStatus,
    isSelected = false,
    onToggleSelect,
}: ProductTableRowProps) => {
    const router = useRouter();
    const [showActions, setShowActions] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-success/10 text-success';
            case 'draft':
                return 'bg-warning/10 text-warning';
            case 'archived':
                return 'bg-muted text-muted-foreground';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };

    const handleRowClick = (e: React.MouseEvent) => {
        // Don't navigate if clicking checkbox or action buttons
        const target = e.target as HTMLElement;
        if (target.closest('input, button')) return;
        router.push(`/product-detail?id=${product.id}`);
    };

    return (
        <tr
            className="border-b border-border hover:bg-muted/50 transition-luxury cursor-pointer"
            onClick={handleRowClick}
        >
            {onToggleSelect && (
                <td className="p-4">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={onToggleSelect}
                        className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring transition-luxury"
                    />
                </td>
            )}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-luxury overflow-hidden bg-muted flex-shrink-0">
                        <AppImage
                            src={product.image}
                            alt={product.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="min-w-0">
                        <div className="font-body text-sm font-medium text-foreground truncate">
                            {product.name}
                        </div>
                        {(product.isNew || product.isBestseller || product.isLimited || product.isBestSale) && (
                            <div className="flex flex-wrap gap-1 mt-1">
                                {product.isNew && (
                                    <span className="px-2 py-0.5 bg-accent/10 text-accent rounded caption text-xs">
                                        New
                                    </span>
                                )}
                                {product.isBestseller && (
                                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded caption text-xs">
                                        Bestseller
                                    </span>
                                )}
                                {product.isLimited && (
                                    <span className="px-2 py-0.5 bg-warning/10 text-warning rounded caption text-xs">
                                        Limited
                                    </span>
                                )}
                                {product.isBestSale && (
                                    <span className="px-2 py-0.5 bg-error/10 text-error rounded caption text-xs">
                                        Sale
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </td>
            <td className="p-4">
                <span className="font-body text-sm text-foreground">{product.category}</span>
            </td>
            <td className="px-6 py-4">
                {product.discount ? (
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground line-through">
                            ₹{product.price.toLocaleString()}
                        </span>
                        <span className="data-text text-base font-medium text-foreground">
                            ₹{(product.price - product.discount).toLocaleString()}
                        </span>
                    </div>
                ) : (
                    <span className="data-text text-base font-medium text-foreground">
                        ₹{product.price.toLocaleString()}
                    </span>
                )}
            </td>
            <td className="p-4">
                <button
                    onClick={() => onToggleStatus(product.id)}
                    className={`px-3 py-1.5 rounded-full caption text-xs font-medium transition-luxury ${getStatusColor(
                        product.status
                    )}`}
                >
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </button>
            </td>
            <td className="p-4">
                <div className="relative">
                    <button
                        onClick={() => setShowActions(!showActions)}
                        className="p-2 rounded-luxury transition-luxury hover:bg-muted"
                        aria-label="Product actions"
                    >
                        <Icon name="EllipsisVerticalIcon" size={20} />
                    </button>
                    {showActions && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowActions(false)}
                            />
                            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-luxury shadow-luxury-lg z-20 overflow-hidden">
                                <button
                                    onClick={() => {
                                        onEdit(product);
                                        setShowActions(false);
                                    }}
                                    className="flex items-center gap-3 w-full p-3 transition-luxury hover:bg-muted text-left"
                                >
                                    <Icon name="PencilIcon" size={18} />
                                    <span className="font-body text-sm">Edit Product</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onToggleStatus(product.id);
                                        setShowActions(false);
                                    }}
                                    className="flex items-center gap-3 w-full p-3 transition-luxury hover:bg-muted text-left"
                                >
                                    <Icon name="ArrowPathIcon" size={18} />
                                    <span className="font-body text-sm">Change Status</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(product.id);
                                        setShowActions(false);
                                    }}
                                    className="flex items-center gap-3 w-full p-3 transition-luxury hover:bg-error/10 text-error text-left"
                                >
                                    <Icon name="TrashIcon" size={18} />
                                    <span className="font-body text-sm">Delete</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ProductTableRow;