import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  badge?: string;
  rating: number;
  reviewCount: number;
}

interface FeaturedProductsProps {
  className?: string;
}

const FeaturedProducts = ({ className = '' }: FeaturedProductsProps) => {
  const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Leather Tote - Cognac Brown',
    price: 289.00,
    originalPrice: 399.00,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3d3c0fa-1766569823031.png",
    alt: 'Premium cognac brown leather tote bag with structured silhouette and gold hardware details',
    badge: 'Bestseller',
    rating: 4.8,
    reviewCount: 234
  },
  {
    id: 'prod-2',
    name: 'Minimalist Crossbody - Midnight Black',
    price: 159.00,
    image: "https://images.unsplash.com/photo-1620786514663-8c3f57ffe17c",
    alt: 'Sleek midnight black crossbody bag with adjustable leather strap and minimalist design',
    badge: 'New Arrival',
    rating: 4.9,
    reviewCount: 187
  },
  {
    id: 'prod-3',
    name: 'Structured Shoulder Bag - Camel',
    price: 245.00,
    originalPrice: 320.00,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_198daedf1-1767774927880.png",
    alt: 'Elegant camel leather shoulder bag with structured shape and polished gold clasp',
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 'prod-4',
    name: 'Evening Clutch - Rose Gold',
    price: 129.00,
    image: "https://images.unsplash.com/photo-1575296020525-faff52f00d8c",
    alt: 'Luxurious rose gold metallic clutch with chain strap and crystal embellishments',
    badge: 'Limited Edition',
    rating: 5.0,
    reviewCount: 98
  },
  {
    id: 'prod-5',
    name: 'Convertible Backpack - Navy Blue',
    price: 199.00,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1628b0472-1767917492014.png",
    alt: 'Versatile navy blue leather backpack with convertible straps and multiple compartments',
    rating: 4.6,
    reviewCount: 142
  },
  {
    id: 'prod-6',
    name: 'Weekender Travel Bag - Tan',
    price: 349.00,
    originalPrice: 450.00,
    image: "https://images.unsplash.com/photo-1519144674309-fcb7fbc1a054",
    alt: 'Spacious tan leather weekender bag with brass hardware and detachable shoulder strap',
    badge: 'Sale',
    rating: 4.8,
    reviewCount: 203
  }];


  return (
    <section className={`py-16 lg:py-24 bg-muted/30 ${className}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked selections from our latest arrivals and customer favorites
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) =>
          <ProductCard
            key={product.id}
            {...product}
            href="/product-detail" />

          )}
        </div>
        
        <div className="text-center mt-12">
          <button className="h-14 px-8 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97]">
            View All Products
          </button>
        </div>
      </div>
    </section>);

};

export default FeaturedProducts;