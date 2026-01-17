'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProductManagementInteractive from './components/ProductManagementInteractive';
import AdminNavigation from '@/components/common/AdminNavigation';
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  type Category
} from '@/services/categoryService';

export default function AdminProductManagementPage() {
  const [activeView, setActiveView] = useState<'products' | 'categories'>('products');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (activeView === 'categories') {
      loadCategories();
    }
  }, [activeView]);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      displayOrder: categories.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      displayOrder: category.displayOrder,
      isActive: category.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData);
      } else {
        await addCategory(formData);
      }
      await loadCategories();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        await loadCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <main className="ml-20 lg:ml-72 min-h-screen p-6 lg:p-8 transition-all duration-300">
        <div className="space-y-6">
          {/* Header with Tabs */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-4xl font-bold mb-2">Product Management</h1>
              <p className="text-muted-foreground">Manage products and categories</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-border">
            <button
              onClick={() => setActiveView('products')}
              className={`px-6 py-3 font-medium transition-all relative ${activeView === 'products'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Icon name="ShoppingBagIcon" size={20} className="inline-block mr-2" />
              Products
              {activeView === 'products' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveView('categories')}
              className={`px-6 py-3 font-medium transition-all relative ${activeView === 'categories'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <Icon name="FolderIcon" size={20} className="inline-block mr-2" />
              Categories
              {activeView === 'categories' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Content */}
          {activeView === 'products' ? (
            <ProductManagementInteractive />
          ) : (
            <div className="space-y-4">
              {/* Add Category Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Icon name="PlusIcon" size={20} />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Categories Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-semibold mb-1">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.slug}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {category.isActive ? (
                            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-500/10 text-gray-600 text-xs font-medium rounded-full">
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <span>Order: {category.displayOrder}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="px-4 py-2 bg-error/10 hover:bg-error/20 text-error rounded-lg text-sm font-medium transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {categories.length === 0 && !isLoading && (
                <div className="text-center py-16 bg-card rounded-lg border border-border">
                  <Icon name="FolderIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No categories yet</p>
                  <button
                    onClick={handleAdd}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Add Your First Category
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Category Edit Modal */}
          {isModalOpen && (
            <>
              <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                onClick={() => setIsModalOpen(false)}
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6">
                  <h2 className="font-heading text-2xl font-semibold mb-6">
                    {editingCategory ? 'Edit Category' : 'Add Category'}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            name: e.target.value,
                            slug: generateSlug(e.target.value),
                          });
                        }}
                        className="w-full h-12 px-4 bg-input border border-border rounded-lg"
                        placeholder="e.g., Tote Bags"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Slug *</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: generateSlug(e.target.value) })
                        }
                        className="w-full h-12 px-4 bg-input border border-border rounded-lg"
                        placeholder="tote-bags"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Display Order</label>
                      <input
                        type="number"
                        value={formData.displayOrder}
                        onChange={(e) =>
                          setFormData({ ...formData, displayOrder: parseInt(e.target.value) })
                        }
                        className="w-full h-12 px-4 bg-input border border-border rounded-lg"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-border text-primary"
                      />
                      <label htmlFor="isActive" className="text-sm font-medium">
                        Active
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      {editingCategory ? 'Update' : 'Create'}
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}