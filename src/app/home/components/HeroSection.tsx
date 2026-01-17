import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`relative w-full min-h-[calc(100vh-5rem)] md:min-h-[600px] lg:h-[700px] overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1557156975-10facf485d07"
          alt="Elegant woman in beige coat carrying luxury leather tote bag walking through modern city street"
          className="w-full h-full object-cover"
          priority />

        {/* Dark gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 md:from-background/95 md:via-background/70 md:to-transparent" />
      </div>

      <div className="relative h-full max-w-[1920px] mx-auto px-6 lg:px-12 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white md:text-foreground leading-tight drop-shadow-2xl md:drop-shadow-none">
            Everyday & Travel Bags
            <br />
            <span className="text-accent">for Modern Women</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-white/95 md:text-muted-foreground max-w-xl drop-shadow-lg md:drop-shadow-none">
            Discover our curated collection of premium bags designed for the contemporary woman who values both style and functionality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="/product-listing"
              className="h-14 px-8 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97] flex items-center justify-center"
            >
              Shop Collection
            </a>
            <a
              href="/product-listing"
              className="h-14 px-8 bg-white/10 md:bg-card text-white md:text-foreground border border-white/30 md:border-border backdrop-blur-sm rounded-luxury font-body text-base font-medium transition-luxury hover:bg-white/20 md:hover:bg-muted active:scale-[0.97] flex items-center justify-center"
            >
              View Lookbook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
