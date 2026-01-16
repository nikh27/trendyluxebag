import AppImage from '@/components/ui/AppImage';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  return (
    <section className={`relative w-full h-[600px] lg:h-[700px] overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1557156975-10facf485d07"
          alt="Elegant woman in beige coat carrying luxury leather tote bag walking through modern city street"
          className="w-full h-full object-cover"
          priority />

        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>
      
      <div className="relative h-full max-w-[1920px] mx-auto px-6 lg:px-12 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Everyday & Travel Bags for Modern Women
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl">
            Discover our curated collection of premium bags designed for the contemporary woman who values both style and functionality.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="h-14 px-8 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97]">
              Shop Collection
            </button>
            <button className="h-14 px-8 bg-card text-foreground border border-border rounded-luxury font-body text-base font-medium transition-luxury hover:bg-muted active:scale-[0.97]">
              View Lookbook
            </button>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;