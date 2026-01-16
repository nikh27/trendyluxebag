'use client';

import { useState, useEffect } from 'react';
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
    images: Array<{ url: string; alt: string }>;
    link?: string;
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
}

interface ProductEditModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
}

const ProductEditModal = ({
    product,
    isOpen,
    onClose,
    onSave,
}: ProductEditModalProps) => {
    const [formData, setFormData] = useState<Product>({
        id: product?.id || '',
        name: product?.name || '',
        category: product?.category || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        status: product?.status || 'draft',
        description: product?.description || '',
        image: product?.image || '',
        alt: product?.alt || '',
        images: product?.images || [],
        link: product?.link || '',
        isNew: product?.isNew || false,
        isBestseller: product?.isBestseller || false,
        isLimited: product?.isLimited || false,
        isBestSale: product?.isBestSale || false,
    });
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    if (!isOpen || !formData) return null;

    const categories = [
        'Tote Bags',
        'Clutches',
        'Shoulder Bags',
        'Crossbody',
        'Backpacks',
        'Travel Bags',
    ];

    const handleInputChange = (
        field: keyof Product,
        value: string | number
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleAddImage = () => {
        if (!imageUrl.trim()) {
            setErrors((prev) => ({ ...prev, imageUrl: 'Image URL is required' }));
            return;
        }
        if (!imageAlt.trim()) {
            setErrors((prev) => ({ ...prev, imageAlt: 'Alt text is required' }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, { url: imageUrl, alt: imageAlt }],
        }));
        setImageUrl('');
        setImageAlt('');
        setErrors((prev) => ({ ...prev, imageUrl: '', imageAlt: '' }));
    };

    const handleRemoveImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_: any, i: number) => i !== index),
        }));
    };

    const handleSave = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }
        if (formData.stock < 0) {
            newErrors.stock = 'Stock cannot be negative';
        }
        if (formData.images.length === 0) {
            newErrors.images = 'At least one image is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave(formData);
        onClose();
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-card rounded-luxury shadow-luxury-lg w-full max-w-4xl my-8">
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <h2 className="font-heading text-2xl font-semibold text-foreground">
                            Edit Product
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-luxury transition-luxury hover:bg-muted"
                            aria-label="Close modal"
                        >
                            <Icon name="XMarkIcon" size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-luxury">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="font-body text-lg font-medium text-foreground">
                                Basic Information
                            </h3>
                            <div>
                                <label
                                    htmlFor="product-name"
                                    className="block caption text-muted-foreground mb-2"
                                >
                                    Product Name *
                                </label>
                                <input
                                    id="product-name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                    placeholder="Enter product name"
                                />
                                {errors.name && (
                                    <p className="caption text-error mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="product-description"
                                    className="block caption text-muted-foreground mb-2"
                                >
                                    Description *
                                </label>
                                <textarea
                                    id="product-description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        handleInputChange('description', e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-4 py-3 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    placeholder="Enter product description"
                                />
                                {errors.description && (
                                    <p className="caption text-error mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="product-category"
                                        className="block caption text-muted-foreground mb-2"
                                    >
                                        Category *
                                    </label>
                                    <select
                                        id="product-category"
                                        value={formData.category}
                                        onChange={(e) =>
                                            handleInputChange('category', e.target.value)
                                        }
                                        className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="product-status"
                                        className="block caption text-muted-foreground mb-2"
                                    >
                                        Status *
                                    </label>
                                    <select
                                        id="product-status"
                                        value={formData.status}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'status',
                                                e.target.value as 'active' | 'draft' | 'archived'
                                            )
                                        }
                                        className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="active">Active</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="product-price"
                                        className="block caption text-muted-foreground mb-2"
                                    >
                                        Price (USD) *
                                    </label>
                                    <input
                                        id="product-price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) =>
                                            handleInputChange('price', parseFloat(e.target.value))
                                        }
                                        className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                    {errors.price && (
                                        <p className="caption text-error mt-1">{errors.price}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="product-stock"
                                        className="block caption text-muted-foreground mb-2"
                                    >
                                        Stock Quantity *
                                    </label>
                                    <input
                                        id="product-stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) =>
                                            handleInputChange('stock', parseInt(e.target.value))
                                        }
                                        className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="0"
                                        min="0"
                                    />
                                    {errors.stock && (
                                        <p className="caption text-error mt-1">{errors.stock}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="product-link"
                                    className="block caption text-muted-foreground mb-2"
                                >
                                    Product Link (Optional)
                                </label>
                                <input
                                    id="product-link"
                                    type="url"
                                    value={formData.link || ''}
                                    onChange={(e) => handleInputChange('link', e.target.value)}
                                    className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                    placeholder="https://example.com/product"
                                />
                            </div>
                        </div>

                        {/* Product Tags */}
                        <div>
                            <label className="block font-body text-sm font-medium mb-3">
                                Product Tags
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 p-3 bg-muted rounded-luxury cursor-pointer transition-luxury hover:bg-muted/80">
                                    <input
                                        type="checkbox"
                                        checked={formData.isNew}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isNew: e.target.checked })
                                        }
                                        className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                                    />
                                    <span className="font-body text-sm">New Arrival</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-muted rounded-luxury cursor-pointer transition-luxury hover:bg-muted/80">
                                    <input
                                        type="checkbox"
                                        checked={formData.isBestseller}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isBestseller: e.target.checked })
                                        }
                                        className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                                    />
                                    <span className="font-body text-sm">Bestseller</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-muted rounded-luxury cursor-pointer transition-luxury hover:bg-muted/80">
                                    <input
                                        type="checkbox"
                                        checked={formData.isLimited}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isLimited: e.target.checked })
                                        }
                                        className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                                    />
                                    <span className="font-body text-sm">Limited Edition</span>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-muted rounded-luxury cursor-pointer transition-luxury hover:bg-muted/80">
                                    <input
                                        type="checkbox"
                                        checked={formData.isBestSale}
                                        onChange={(e) =>
                                            setFormData({ ...formData, isBestSale: e.target.checked })
                                        }
                                        className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                                    />
                                    <span className="font-body text-sm">Best Sale</span>
                                </label>
                            </div>
                        </div>

                        {/* Image Management */}
                        <div className="space-y-4">
                            <h3 className="font-body text-lg font-medium text-foreground">
                                Product Images
                            </h3>

                            <div className="space-y-3">
                                <div>
                                    <label
                                        htmlFor="image-url"
                                        className="block caption text-muted-foreground mb-2"
                                    >
                                        Image URL *
                                    </label>
                                    <input
                                        id="image-url"
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {errors.imageUrl && (
                                        <p className="caption text-error mt-1">{errors.imageUrl}</p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="image-alt"
                                        className="block caption text-muted-foreground mb-2"
                                    >
                                        Image Alt Text *
                                    </label>
                                    <input
                                        id="image-alt"
                                        type="text"
                                        value={imageAlt}
                                        onChange={(e) => setImageAlt(e.target.value)}
                                        className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                        placeholder="Describe the image for accessibility"
                                    />
                                    {errors.imageAlt && (
                                        <p className="caption text-error mt-1">{errors.imageAlt}</p>
                                    )}
                                </div>

                                <button
                                    onClick={handleAddImage}
                                    className="flex items-center gap-2 h-12 px-6 bg-muted text-foreground rounded-luxury font-body text-base font-medium transition-luxury hover:bg-muted/80"
                                >
                                    <Icon name="PlusIcon" size={20} />
                                    <span>Add Image</span>
                                </button>
                            </div>

                            {errors.images && (
                                <p className="caption text-error">{errors.images}</p>
                            )}

                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {formData.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative group rounded-luxury overflow-hidden bg-muted"
                                        >
                                            <div className="aspect-square">
                                                <AppImage
                                                    src={img.url}
                                                    alt={img.alt}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-2 right-2 p-2 bg-error text-error-foreground rounded-luxury opacity-0 group-hover:opacity-100 transition-luxury"
                                                aria-label="Remove image"
                                            >
                                                <Icon name="TrashIcon" size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                        <button
                            onClick={onClose}
                            className="h-12 px-6 bg-muted text-foreground rounded-luxury font-body text-base font-medium transition-luxury hover:bg-muted/80"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="h-12 px-6 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductEditModal;