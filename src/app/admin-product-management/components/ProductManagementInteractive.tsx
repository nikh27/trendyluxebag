'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProductTableRow from './ProductTableRow';
import ProductCard from './ProductCard';
import ProductEditModal from './ProductEditModal';
import BulkActionsDropdown from './BulkActionsDropdown';

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

const ProductManagementInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    setIsHydrated(true);

    const mockProducts: Product[] = [
      {
        id: 'PRD001',
        name: 'Classic Leather Tote',
        category: 'Tote Bags',
        price: 299,
        status: 'active',
        image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
        alt: 'Elegant brown leather tote bag with gold hardware on white background',
        stock: 45,
        description: 'Timeless leather tote perfect for everyday use with spacious interior and premium craftsmanship',
        images: [
          {
            url: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
            alt: 'Elegant brown leather tote bag with gold hardware on white background'
          },
          {
            url: "https://images.unsplash.com/photo-1637759292654-a12cb2be085e",
            alt: 'Close-up of brown leather tote bag showing texture and stitching details'
          }],

        link: '/product-detail',
        isNew: true,
        isBestseller: true
      },
      {
        id: 'PRD002',
        name: 'Evening Clutch Gold',
        category: 'Clutches',
        price: 189,
        status: 'active',
        image: "https://images.unsplash.com/photo-1601281866896-1576541e77a1",
        alt: 'Luxurious gold metallic clutch with chain strap on marble surface',
        stock: 28,
        description: 'Sophisticated gold clutch with detachable chain strap for elegant evening occasions',
        images: [
          {
            url: "https://images.unsplash.com/photo-1601281866896-1576541e77a1",
            alt: 'Luxurious gold metallic clutch with chain strap on marble surface'
          }],

        link: '/product-detail',
        isBestSale: true
      },
      {
        id: 'PRD003',
        name: 'Crossbody Messenger',
        category: 'Crossbody',
        price: 249,
        status: 'active',
        image: "https://images.unsplash.com/photo-1620786514663-8c3f57ffe17c",
        alt: 'Modern black crossbody messenger bag with adjustable strap on urban background',
        stock: 62,
        description: 'Versatile crossbody messenger with multiple compartments for modern lifestyle',
        images: [
          {
            url: "https://images.unsplash.com/photo-1620786514663-8c3f57ffe17c",
            alt: 'Modern black crossbody messenger bag with adjustable strap on urban background'
          }],

        link: '/product-detail',
        isBestseller: true
      },
      {
        id: 'PRD004',
        name: 'Travel Backpack Pro',
        category: 'Backpacks',
        price: 349,
        status: 'draft',
        image: "https://images.unsplash.com/photo-1583747354150-c8d5f09e4d8a",
        alt: 'Spacious navy blue travel backpack with laptop compartment on wooden floor',
        stock: 18,
        description: 'Professional travel backpack with laptop compartment and ergonomic design',
        images: [
          {
            url: "https://images.unsplash.com/photo-1583747354150-c8d5f09e4d8a",
            alt: 'Spacious navy blue travel backpack with laptop compartment on wooden floor'
          }],

        link: '/product-detail',
        isNew: true
      },
      {
        id: 'PRD005',
        name: 'Shoulder Bag Classic',
        category: 'Shoulder Bags',
        price: 279,
        status: 'active',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_198daedf1-1767774927880.png",
        alt: 'Elegant beige shoulder bag with gold chain detail hanging on display',
        stock: 34,
        description: 'Classic shoulder bag with timeless design and premium materials',
        images: [
          {
            url: "https://img.rocket.new/generatedImages/rocket_gen_img_198daedf1-1767774927880.png",
            alt: 'Elegant beige shoulder bag with gold chain detail hanging on display'
          }],

        link: '/product-detail',
        isLimited: true
      },
      {
        id: 'PRD006',
        name: 'Mini Crossbody',
        category: 'Crossbody',
        price: 159,
        status: 'active',
        image: "https://images.unsplash.com/photo-1713425885987-fa917f173fa9",
        alt: 'Compact red mini crossbody bag with gold hardware on white surface',
        stock: 52,
        description: 'Compact crossbody perfect for essentials with adjustable strap',
        images: [
          {
            url: "https://images.unsplash.com/photo-1713425885987-fa917f173fa9",
            alt: 'Compact red mini crossbody bag with gold hardware on white surface'
          }],

        link: '/product-detail'
      },
      {
        id: 'PRD007',
        name: 'Weekend Tote Large',
        category: 'Tote Bags',
        price: 329,
        status: 'archived',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_12e3fa5ba-1765572948306.png",
        alt: 'Large canvas tote bag with leather handles perfect for weekend trips',
        stock: 0,
        description: 'Spacious weekend tote with durable canvas and leather accents',
        images: [
          {
            url: "https://img.rocket.new/generatedImages/rocket_gen_img_12e3fa5ba-1765572948306.png",
            alt: 'Large canvas tote bag with leather handles perfect for weekend trips'
          }],

        link: '/product-detail'
      },
      {
        id: 'PRD008',
        name: 'Designer Clutch Pearl',
        category: 'Clutches',
        price: 399,
        status: 'active',
        image: "https://images.unsplash.com/photo-1608368553807-622b422ee2c0",
        alt: 'Luxury pearl-embellished clutch with crystal clasp on velvet background',
        stock: 12,
        description: 'Exclusive designer clutch with pearl embellishments and crystal details',
        images: [
          {
            url: "https://images.unsplash.com/photo-1608368553807-622b422ee2c0",
            alt: 'Luxury pearl-embellished clutch with crystal clasp on velvet background'
          }],

        link: '/product-detail',
        isLimited: true,
        isBestSale: true
      }];


    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'stock') {
        comparison = a.stock - b.stock;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy, sortOrder, products, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4 w-full max-w-6xl px-6">
          <div className="h-12 bg-muted rounded-luxury" />
          <div className="h-96 bg-muted rounded-luxury" />
        </div>
      </div>);

  }

  const categories = [
    'all',
    'Tote Bags',
    'Clutches',
    'Shoulder Bags',
    'Crossbody',
    'Backpacks',
    'Travel Bags'];


  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleToggleStatus = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const statusOrder: Array<'active' | 'draft' | 'archived'> = [
            'active',
            'draft',
            'archived'];

          const currentIndex = statusOrder.indexOf(p.status);
          const nextStatus =
            statusOrder[(currentIndex + 1) % statusOrder.length];
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const handleToggleSelect = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ?
        prev.filter((id) => id !== productId) :
        [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleBulkDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedProducts.length} products?`
      )) {
      setProducts((prev) =>
        prev.filter((p) => !selectedProducts.includes(p.id))
      );
      setSelectedProducts([]);
    }
  };

  const handleBulkStatusChange = (status: 'active' | 'draft' | 'archived') => {
    setProducts((prev) =>
      prev.map((p) =>
        selectedProducts.includes(p.id) ? { ...p, status } : p
      )
    );
    setSelectedProducts([]);
  };

  const handleSort = (field: 'name' | 'price' | 'stock') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct({
                id: `PRD${String(products.length + 1).padStart(3, '0')}`,
                name: '',
                category: 'Tote Bags',
                price: 0,
                status: 'draft',
                image: '',
                alt: '',
                stock: 0,
                description: '',
                images: [],
                link: ''
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 h-12 px-6 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97]">

            <Icon name="PlusIcon" size={20} />
            <span>Add Product</span>
          </button>

          <BulkActionsDropdown
            selectedCount={selectedProducts.length}
            onBulkDelete={handleBulkDelete}
            onBulkStatusChange={handleBulkStatusChange}
            onClearSelection={() => setSelectedProducts([])} />

        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-80">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-12 pl-12 pr-4 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring" />

          </div>

          <button
            onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
            className="p-3 bg-muted rounded-luxury transition-luxury hover:bg-muted/80 lg:block hidden"
            aria-label="Toggle view mode">

            <Icon
              name={viewMode === 'table' ? 'Squares2X2Icon' : 'TableCellsIcon'}
              size={20} />

          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-luxury pb-2">
        {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-luxury font-body text-sm font-medium whitespace-nowrap transition-luxury ${selectedCategory === cat ?
                'bg-primary text-primary-foreground' :
                'bg-muted text-foreground hover:bg-muted/80'}`
            }>

            {cat === 'all' ? 'All Categories' : cat}
          </button>
        )}
      </div>

      {/* Desktop Table View */}
      {viewMode === 'table' &&
        <div className="hidden lg:block bg-card rounded-luxury shadow-luxury-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring transition-luxury" />

                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 font-body text-sm font-medium text-foreground transition-luxury hover:text-primary">

                      <span>Product</span>
                      {sortBy === 'name' &&
                        <Icon
                          name={
                            sortOrder === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'
                          }
                          size={16} />

                      }
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <span className="font-body text-sm font-medium text-foreground">
                      Category
                    </span>
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSort('price')}
                      className="flex items-center gap-2 font-body text-sm font-medium text-foreground transition-luxury hover:text-primary">

                      <span>Price</span>
                      {sortBy === 'price' &&
                        <Icon
                          name={
                            sortOrder === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'
                          }
                          size={16} />

                      }
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <button
                      onClick={() => handleSort('stock')}
                      className="flex items-center gap-2 font-body text-sm font-medium text-foreground transition-luxury hover:text-primary">

                      <span>Stock</span>
                      {sortBy === 'stock' &&
                        <Icon
                          name={
                            sortOrder === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'
                          }
                          size={16} />

                      }
                    </button>
                  </th>
                  <th className="p-4 text-left">
                    <span className="font-body text-sm font-medium text-foreground">
                      Status
                    </span>
                  </th>
                  <th className="p-4 text-left">
                    <span className="font-body text-sm font-medium text-foreground">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    isSelected={selectedProducts.includes(product.id)}
                    onToggleSelect={() => handleToggleSelect(product.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 &&
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <Icon
                name="ShoppingBagIcon"
                size={48}
                className="text-muted-foreground mb-4" />

              <p className="font-body text-lg text-foreground mb-2">
                No products found
              </p>
              <p className="caption text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          }
        </div>
      }

      {/* Grid View (Desktop & Mobile) */}
      {(viewMode === 'grid' || window.innerWidth < 1024) &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) =>
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus} />

          )}
        </div>
      }

      {filteredProducts.length === 0 && viewMode === 'grid' &&
        <div className="flex flex-col items-center justify-center py-16 px-6 bg-card rounded-luxury">
          <Icon
            name="ShoppingBagIcon"
            size={48}
            className="text-muted-foreground mb-4" />

          <p className="font-body text-lg text-foreground mb-2">
            No products found
          </p>
          <p className="caption text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      }

      {/* Edit Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct} />

    </div>);

};

export default ProductManagementInteractive;