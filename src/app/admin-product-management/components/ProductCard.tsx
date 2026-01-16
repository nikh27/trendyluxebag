'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    status: 'active' | 'draft' | 'archived';
    image: string;
    alt: string;
    stock: number;
    description: string;
    images: Array<{ url: string; alt: string; }>;
    link?: string;
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
}

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (productId: string) => void;
    onToggleStatus: (productId: string) => void;
}

const ProductCard = ({
    product,
    onEdit,
    onDelete,
    onToggleStatus,
}: ProductCardProps) => {
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

    return (
        <div className="bg-card rounded-luxury shadow-luxury-sm overflow-hidden">
            <div className="relative h-48 bg-muted overflow-hidden">
                <AppImage
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover"
                />
                {/* Product Tags */}
                {(product.isNew || product.isBestseller || product.isLimited || product.isBestSale) && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {product.isNew && (
                            <span className="px-2 py-1 bg-accent text-accent-foreground rounded caption text-xs font-medium">
                                New
                            </span>
                        )}
                        {product.isBestseller && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground rounded caption text-xs font-medium">
                                Bestseller
                            </span>
                        )}
                        {product.isLimited && (
                            <span className="px-2 py-1 bg-warning text-warning-foreground rounded caption text-xs font-medium">
                                Limited
                            </span>
                        )}
                        {product.isBestSale && (
                            <span className="px-2 py-1 bg-error text-error-foreground rounded caption text-xs font-medium">
                                Best Sale
                            </span>
                        )}
                    </div>
                )}
                <button
                    onClick={() => setShowActions(!showActions)}
                    className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-luxury transition-luxury hover:bg-card"
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
                        <div className="absolute right-3 top-14 w-48 bg-card border border-border rounded-luxury shadow-luxury-lg z-20 overflow-hidden">
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
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-body text-base font-medium text-foreground truncate">
                        {product.name}
                    </h3>
                    <p className="caption text-muted-foreground">ID: {product.id}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="caption text-muted-foreground">{product.category}</span>
                    <span className="data-text text-base font-medium text-foreground">
                        ${product.price.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="caption text-muted-foreground">
                        Stock: {product.stock} units
                    </span>
                    <button
                        onClick={() => onToggleStatus(product.id)}
                        className={`px-3 py-1.5 rounded-full caption text-xs font-medium transition-luxury ${getStatusColor(
                            product.status
                        )}`}
                    >
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;