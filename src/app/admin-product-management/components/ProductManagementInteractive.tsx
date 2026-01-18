'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProductTableRow from './ProductTableRow';
import ProductCard from './ProductCard';
import ProductEditModal from './ProductEditModal';
import BulkActionsDropdown from './BulkActionsDropdown';
import { getAllProducts, deleteProduct, updateProduct } from '@/services/productService';
import type { Product } from '../types/product';

const ProductManagementInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState<string[]>(['all']);

  useEffect(() => {
    setIsHydrated(true);

    // Fetch products from Firestore
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        // Map Firestore products to component format
        const mappedProducts = fetchedProducts.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          discount: product.discount,
          status: product.status,
          image: product.images[0]?.url || '',
          alt: product.images[0]?.alt || product.name,
          description: product.description,
          images: product.images,
          productLink: product.productLink,
          keyHighlights: product.keyHighlights,
          specifications: product.specifications,
          tags: product.tags,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        }));

        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadCategoryFilters = async () => {
      try {
        const { getActiveCategories } = await import('@/services/categoryService');
        const cats = await getActiveCategories();
        if (cats.length > 0) {
          setCategoryFilters(['all', ...cats.map(c => c.name)]);
        }
      } catch (error) {
        console.error('Error loading category filters:', error);
      }
    };
    loadCategoryFilters();
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


  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        setSelectedProducts((prev) => prev.filter((id) => id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleToggleStatus = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Only toggle between active and draft
    const newStatus = product.status === 'active' ? 'draft' : 'active';

    try {
      await updateProduct(productId, { status: newStatus });
      setProducts(prev => prev.map(p =>
        p.id === productId ? { ...p, status: newStatus } : p
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleSaveProduct = async () => {
    // Reload products after save
    setIsLoading(true);
    try {
      const fetchedProducts = await getAllProducts();
      const mappedProducts = fetchedProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        discount: product.discount,
        status: product.status,
        image: product.images[0]?.url || '',
        alt: product.images[0]?.alt || product.name,
        description: product.description,
        images: product.images,
        productLink: product.productLink,
        keyHighlights: product.keyHighlights,
        specifications: product.specifications,
        tags: product.tags,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));

      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error reloading products:', error);
    } finally {
      setIsLoading(false);
    }
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

  const handleSort = (field: 'name' | 'price') => {
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
              setEditingProduct(null); // Pass null for new product
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

      {/* Filters - Only show if there are categories */}
      {categoryFilters.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-luxury pb-2">
          {categoryFilters.map((cat) =>
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
      )}

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
                  <th className="p-4 text-left w-1/5">
                    <span className="font-body text-sm font-medium text-foreground">
                      Category
                    </span>
                  </th>
                  <th className="p-4 text-left w-1/5">
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