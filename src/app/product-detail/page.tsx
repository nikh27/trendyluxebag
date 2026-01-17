'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CustomerNavigation from '@/components/common/CustomerNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';
import ProductDetailInteractive from './components/ProductDetailInteractive';
import { getProductById, getAllProducts, type Product } from '@/services/productService';

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [productId]);

  const loadProduct = async (id: string) => {
    try {
      setLoading(true);
      const data = await getProductById(id);

      if (data && data.status === 'active') {
        setProduct(data);

        // Fetch related products from same category
        const allProducts = await getAllProducts();
        const related = allProducts
          .filter(p =>
            p.category === data.category &&
            p.id !== id &&
            p.status === 'active'
          )
          .slice(0, 4)
          .map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.discount ? p.price : undefined,
            image: p.images[0]?.url || '',
            alt: p.images[0]?.alt || p.name,
            rating: 4.5, // TODO: Add ratings to product schema
            category: p.category,
            isNew: p.tags?.isNew || p.isNew,
            isBestseller: p.tags?.isBestseller || p.isBestseller,
            isLimited: p.tags?.isLimited || p.isLimited,
            isBestSale: p.tags?.isBestSale || p.isBestSale,
          }));

        setRelatedProducts(related);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    console.log('Product added to cart');
    // TODO: Implement cart functionality
  };

  const handleBuyNow = () => {
    console.log('Proceeding to checkout');
    // TODO: Implement checkout
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation />
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-muted rounded-luxury" />
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-6 bg-muted rounded w-1/2" />
                  <div className="h-32 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerNavigation />
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or is no longer available.
            </p>
            <button
              onClick={() => router.push('/product-listing')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-luxury hover:opacity-90 transition-luxury"
            >
              Browse Products
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Transform product data for ProductDetailInteractive
  const transformedProduct = {
    id: product.id,
    name: product.name,
    price: product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price,
    originalPrice: product.discount ? product.price : undefined,
    rating: 4.8, // TODO: Add to schema
    reviewCount: 0, // TODO: Add to schema
    description: product.description,
    highlights: product.keyHighlights || product.highlights || [],
    specifications: product.specifications ? Object.entries(product.specifications).map(([label, value]) => ({ label, value })) : [],
    images: product.images || [],
    tags: product.tags || {
      isNew: product.isNew,
      isBestseller: product.isBestseller,
      isLimited: product.isLimited,
      isBestSale: product.isBestSale,
    },
    link: product.link || (product as any).productLink || '',
  };

  console.log('🔗 Product link:', transformedProduct.link);

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />

      <main className="pt-20 pb-20 md:pb-8">
        <ProductDetailInteractive
          product={transformedProduct}
          relatedProducts={relatedProducts} />
      </main>
    </div>
  );
}
