import type { Metadata } from 'next';
import CustomerNavigation from '@/components/common/CustomerNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Home - TrendyLuxeBag',
  description: 'Discover premium everyday and travel bags for modern women. Shop our curated collection of luxury tote bags, clutches, shoulder bags, crossbody bags, backpacks, and travel bags designed for style and functionality.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      
      <main className="pt-20">
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
      
      <Footer />
      <MobileNavigation showCartBadge cartItemCount={3} />
    </div>
  );
}