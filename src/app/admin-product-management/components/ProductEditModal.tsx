'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    discount?: number; // Discount percentage
    status: 'active' | 'draft' | 'archived';
    image: string;
    alt: string;
    description: string;
    images: Array<{ url: string; alt: string }>;
    link?: string; // External Amazon/affiliate link
    highlights?: string[]; // Key highlights as bullet points
    specifications?: Record<string, string>; // Key-value pairs
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
        discount: product?.discount || 0,
        status: product?.status || 'draft',
        description: product?.description || '',
        image: product?.image || '',
        alt: product?.alt || '',
        images: product?.images || [],
        link: product?.link || '',
        highlights: product?.highlights || [],
        specifications: product?.specifications || {},
        isNew: product?.isNew || false,
        isBestseller: product?.isBestseller || false,
        isLimited: product?.isLimited || false,
        isBestSale: product?.isBestSale || false,
    });
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [newHighlight, setNewHighlight] = useState('');
    const [newSpecKey, setNewSpecKey] = useState('');
    const [newSpecValue, setNewSpecValue] = useState('');

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
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] transition-opacity"
                onClick={onClose}
            />
            {/* Modal Container - Above sidebar */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
                <div className="bg-card rounded-lg sm:rounded-luxury shadow-luxury-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] my-auto flex flex-col">
                    {/* Header - Sticky */}
                    <div className="sticky top-0 z-10 bg-card flex items-center justify-between p-4 sm:p-6 border-b border-border rounded-t-lg sm:rounded-t-luxury">
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground">
                            {product ? 'Edit Product' : 'Add Product'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-muted transition-luxury flex-shrink-0"
                            aria-label="Close modal"
                        >
                            <Icon name="XMarkIcon" size={20} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
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

                        {/* Discount, Highlights & Specifications */}
                        <div className="space-y-4">
                            <h3 className="font-body text-lg font-medium text-foreground">
                                Additional Details
                            </h3>

                            {/* Discount */}
                            <div>
                                <label htmlFor="product-discount" className="block caption text-muted-foreground mb-2">
                                    Discount (%)
                                </label>
                                <input
                                    id="product-discount"
                                    type="number"
                                    value={formData.discount || 0}
                                    onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                                    className="w-full h-12 px-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring"
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                />
                            </div>

                            {/* Key Highlights */}
                            <div>
                                <label className="block caption text-muted-foreground mb-2">
                                    Key Highlights
                                </label>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newHighlight}
                                            onChange={(e) => setNewHighlight(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (newHighlight.trim()) {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            highlights: [...(prev.highlights || []), newHighlight.trim()]
                                                        }));
                                                        setNewHighlight('');
                                                    }
                                                }
                                            }}
                                            className="flex-1 h-10 px-4 bg-input border border-border rounded-lg font-body text-sm"
                                            placeholder="Add a highlight..."
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (newHighlight.trim()) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        highlights: [...(prev.highlights || []), newHighlight.trim()]
                                                    }));
                                                    setNewHighlight('');
                                                }
                                            }}
                                            className="px-4 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    {formData.highlights && formData.highlights.length > 0 && (
                                        <div className="space-y-1">
                                            {formData.highlights.map((highlight, index) => (
                                                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                                                    <span className="flex-1 text-sm">• {highlight}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                highlights: prev.highlights?.filter((_, i) => i !== index) || []
                                                            }));
                                                        }}
                                                        className="p-1 hover:bg-error/10 rounded"
                                                    >
                                                        <Icon name="XMarkIcon" size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Specifications */}
                            <div>
                                <label className="block caption text-muted-foreground mb-2">
                                    Specifications
                                </label>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newSpecKey}
                                            onChange={(e) => setNewSpecKey(e.target.value)}
                                            className="flex-1 h-10 px-4 bg-input border border-border rounded-lg text-sm"
                                            placeholder="Key (e.g., Material)"
                                        />
                                        <input
                                            type="text"
                                            value={newSpecValue}
                                            onChange={(e) => setNewSpecValue(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (newSpecKey.trim() && newSpecValue.trim()) {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            specifications: {
                                                                ...(prev.specifications || {}),
                                                                [newSpecKey.trim()]: newSpecValue.trim()
                                                            }
                                                        }));
                                                        setNewSpecKey('');
                                                        setNewSpecValue('');
                                                    }
                                                }
                                            }}
                                            className="flex-1 h-10 px-4 bg-input border border-border rounded-lg text-sm"
                                            placeholder="Value (e.g., Leather)"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (newSpecKey.trim() && newSpecValue.trim()) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        specifications: {
                                                            ...(prev.specifications || {}),
                                                            [newSpecKey.trim()]: newSpecValue.trim()
                                                        }
                                                    }));
                                                    setNewSpecKey('');
                                                    setNewSpecValue('');
                                                }
                                            }}
                                            className="px-4 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    {formData.specifications && Object.keys(formData.specifications).length > 0 && (
                                        <div className="space-y-1">
                                            {Object.entries(formData.specifications).map(([key, value]) => (
                                                <div key={key} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                                                    <span className="text-sm font-medium">{key}:</span>
                                                    <span className="flex-1 text-sm text-muted-foreground">{value}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => {
                                                                const newSpecs = { ...(prev.specifications || {}) };
                                                                delete newSpecs[key];
                                                                return { ...prev, specifications: newSpecs };
                                                            });
                                                        }}
                                                        className="p-1 hover:bg-error/10 rounded"
                                                    >
                                                        <Icon name="XMarkIcon" size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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

                    {/* Footer - Sticky */}
                    <div className="sticky bottom-0 z-10 bg-card flex gap-3 p-4 sm:p-6 border-t border-border rounded-b-lg sm:rounded-b-luxury">
                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none h-12 px-6 bg-muted text-foreground rounded-luxury font-body text-base font-medium transition-luxury hover:bg-muted/80 active:scale-[0.97]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 sm:flex-none h-12 px-6 bg-primary text-primary-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97]"
                        >
                            {product ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductEditModal;