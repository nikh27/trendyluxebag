'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

// Animated counter component
const AnimatedNumber = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * value);

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const stats: Stat[] = [
    {
      value: 10000,
      suffix: '+',
      label: 'Happy Customers',
      description: 'Women who trust our brand',
    },
    {
      value: 500,
      suffix: '+',
      label: 'Unique Designs',
      description: 'Handcrafted with love',
    },
    {
      value: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'In luxury craftsmanship',
    },
    {
      value: 98,
      suffix: '%',
      label: 'Satisfaction Rate',
      description: 'Customer happiness guaranteed',
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-accent/10"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-accent/10"
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <FadeIn direction="right">
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
              >
                Our Journey
              </motion.span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Crafting Excellence
                <br />
                <span className="text-accent">Since 2009</span>
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-lg leading-relaxed">
                For over 15 years, we've been dedicated to creating timeless pieces that combine traditional craftsmanship with modern design. Every bag tells a story of quality, passion, and attention to detail.
              </p>
              <motion.a
                href="/product-listing"
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-accent font-medium group"
              >
                Discover Our Story
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.a>
            </div>
          </FadeIn>

          {/* Right side - Stats Grid */}
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group bg-card rounded-2xl p-6 lg:p-8 shadow-luxury-sm hover:shadow-luxury transition-all duration-300 border border-border/50 hover:border-accent/30"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="font-heading text-4xl lg:text-5xl font-bold text-accent mb-2"
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {stat.description}
                  </p>

                  {/* Decorative accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
