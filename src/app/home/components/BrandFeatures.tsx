'use client';

import Icon from '@/components/ui/AppIcon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const BrandFeatures = () => {
  const features: Feature[] = [
    {
      icon: 'CursorArrowRaysIcon',
      title: 'Curated Selection',
      description: 'Handpicked trending bags from top brands',
    },
    {
      icon: 'GlobeAltIcon',
      title: 'Shop Worldwide',
      description: 'Discover bags from global retailers',
    },
    {
      icon: 'SparklesIcon',
      title: 'Latest Trends',
      description: 'Updated daily with newest styles',
    },
    {
      icon: 'HeartIcon',
      title: 'Save Favorites',
      description: 'Bookmark bags you love for later',
    },
  ];

  return (
    <section className="py-10 lg:py-14 border-b border-border bg-muted/30">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-4 lg:p-6 rounded-xl hover:bg-card transition-colors duration-200"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Icon name={feature.icon} size={24} className="text-accent" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandFeatures;
