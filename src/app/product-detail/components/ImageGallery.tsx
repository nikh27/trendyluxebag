'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full">
        <div className="aspect-square bg-muted rounded-luxury mb-4 animate-pulse" />
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-luxury animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative aspect-square bg-muted rounded-luxury overflow-hidden mb-4 group">
        <AppImage
          src={images[selectedIndex].url}
          alt={images[selectedIndex].alt}
          className={`w-full h-full object-cover transition-luxury ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={handleZoomToggle}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-luxury opacity-0 group-hover:opacity-100 hover:bg-background shadow-luxury"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-luxury opacity-0 group-hover:opacity-100 hover:bg-background shadow-luxury"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full caption font-medium">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 p-2 bg-background/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-luxury">
          <Icon name={isZoomed ? 'MagnifyingGlassMinusIcon' : 'MagnifyingGlassPlusIcon'} size={20} />
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`aspect-square rounded-luxury overflow-hidden transition-luxury ${
              selectedIndex === index
                ? 'ring-2 ring-primary shadow-luxury'
                : 'ring-1 ring-border hover:ring-primary/50'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <AppImage
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;