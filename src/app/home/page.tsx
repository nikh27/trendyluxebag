'use client';

import { useState } from 'react';
import CustomerNavigation from '@/components/common/CustomerNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';
import HeroSection from './components/HeroSection';
import BrandFeatures from './components/BrandFeatures';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import LookbookSection from './components/LookbookSection';
import InstagramFeed from './components/InstagramFeed';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import VideoModal from '@/components/ui/VideoModal';

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  const openVideo = (url: string, title: string) => {
    setCurrentVideoUrl(url);
    setCurrentVideoTitle(title);
    setIsVideoOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />

      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection onWatchLookbook={() => openVideo('https://youtu.be/t14yFb8sca4', 'TrendyLuxeBag Lookbook 2026')} />

        {/* Brand Features */}
        <BrandFeatures />

        {/* Shop by Category */}
        <CategoryGrid />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Lookbook Video Section */}
        <LookbookSection onPlayVideo={() => openVideo('/video/lookbook-detail.mp4', 'Discover Our Latest Collection')} />

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      <Footer />
      <MobileNavigation showCartBadge cartItemCount={3} />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={currentVideoUrl}
        title={currentVideoTitle}
      />
    </div>
  );
}
