'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
  onWatchLookbook?: () => void;
}

const HeroSection = ({ className = '', onWatchLookbook }: HeroSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-[calc(100vh-5rem)] md:min-h-[600px] lg:min-h-[700px] overflow-hidden ${className}`}
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <AppImage
          src="https://images.unsplash.com/photo-1557156975-10facf485d07"
          alt="Elegant woman in beige coat carrying luxury leather tote bag walking through modern city street"
          className="w-full h-[120%] object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
      </motion.div>

      {/* Content with Parallax */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative h-full max-w-[1920px] mx-auto px-6 lg:px-12 flex items-center min-h-[calc(100vh-5rem)] md:min-h-[600px] lg:min-h-[700px]"
      >
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-white">
              New Collection 2026
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Discover Trending
            <br />
            <span className="text-accent">Luxury Bags</span>
          </h1>

          {/* Description */}
          <p className="font-body text-lg text-white/90 max-w-xl leading-relaxed">
            Your curated destination for the finest handbags from top global brands. Find your perfect style today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="/product-listing"
              className="h-12 px-8 bg-accent text-accent-foreground rounded-lg font-body text-base font-medium transition-all hover:bg-accent/90 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Explore Collection
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            {onWatchLookbook && (
              <button
                onClick={onWatchLookbook}
                className="h-12 px-8 bg-white text-black rounded-lg font-body text-base font-medium transition-all hover:bg-white/90 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Icon name="PlayIcon" size={20} className="fill-current" />
                Watch Lookbook
              </button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white/30"
                  />
                ))}
              </div>
              <span className="text-sm text-white/80">
                <strong className="text-white">10k+</strong> Happy Users
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-white/80 ml-1">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
