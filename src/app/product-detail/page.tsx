'use client';

import CustomerNavigation from '@/components/common/CustomerNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';
import ProductDetailInteractive from './components/ProductDetailInteractive';

export default function ProductDetailPage() {
  const product = {
    id: 'prod-001',
    name: 'Luxury Leather Tote Bag',
    price: 1299,
    originalPrice: 1799,
    rating: 4.8,
    reviewCount: 342,
    description: 'Elevate your everyday style with our signature Luxury Leather Tote Bag. Handcrafted from premium Italian leather, this sophisticated piece combines timeless elegance with modern functionality. The spacious interior features multiple compartments to keep your essentials organized, while the adjustable straps ensure comfortable carrying throughout your day. Perfect for the modern woman who values both style and practicality.',
    highlights: [
    'Handcrafted from premium Italian leather',
    'Gold-plated hardware with signature logo',
    'Multiple interior compartments with secure zipper closure',
    'Adjustable leather straps for versatile carrying',
    'Protective metal feet to preserve bag structure',
    'Includes dust bag and authenticity certificate'],

    specifications: [
    { label: 'Material', value: 'Italian Leather' },
    { label: 'Dimensions', value: '15" W x 12" H x 6" D' },
    { label: 'Weight', value: '2.8 lbs' },
    { label: 'Closure', value: 'Magnetic Snap' },
    { label: 'Strap Drop', value: '8-10" (Adjustable)' },
    { label: 'Interior', value: '3 Compartments, 2 Pockets' },
    { label: 'Color', value: 'Cognac Brown' },
    { label: 'Hardware', value: 'Gold-Plated' }],

    images: [
    {
      url: "https://images.unsplash.com/photo-1701792606084-10fbd4a9eed1",
      alt: 'Luxury cognac brown leather tote bag with gold hardware displayed on white marble surface'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9768f13-1768234757209.png",
      alt: 'Close-up view of premium Italian leather texture and gold-plated logo detail on tote bag'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_10f3015db-1764808252373.png",
      alt: 'Interior view showing three compartments and zippered pockets inside luxury tote bag'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_138bf876c-1764808252243.png",
      alt: 'Side profile of leather tote bag showing adjustable straps and protective metal feet'
    }]

  };

  const relatedProducts = [
  {
    id: 'prod-002',
    name: 'Classic Crossbody Bag',
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1620786514663-8c3f57ffe17c",
    alt: 'Elegant black leather crossbody bag with gold chain strap on beige background',
    rating: 4.7,
    category: 'Crossbody'
  },
  {
    id: 'prod-003',
    name: 'Evening Clutch',
    price: 599,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a32642b8-1764759841662.png",
    alt: 'Sophisticated gold metallic evening clutch with crystal clasp on silk fabric',
    rating: 4.9,
    category: 'Clutch'
  },
  {
    id: 'prod-004',
    name: 'Travel Backpack',
    price: 1499,
    originalPrice: 1899,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1628b0472-1767917492014.png",
    alt: 'Premium brown leather travel backpack with multiple compartments on wooden floor',
    rating: 4.6,
    category: 'Backpack'
  },
  {
    id: 'prod-005',
    name: 'Shoulder Bag',
    price: 1099,
    image: "https://images.unsplash.com/photo-1713425886495-8243c9933b00",
    alt: 'Luxurious burgundy leather shoulder bag with gold hardware on marble pedestal',
    rating: 4.8,
    category: 'Shoulder'
  }];


  const handleAddToCart = () => {
    console.log('Product added to cart');
  };

  const handleBuyNow = () => {
    console.log('Proceeding to checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      
      <main className="pt-20 pb-20 md:pb-8">
        <ProductDetailInteractive
          product={product}
          relatedProducts={relatedProducts} />

      </main>

      <MobileNavigation
        showCartBadge={true}
        cartItemCount={3}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow} />

    </div>);

}