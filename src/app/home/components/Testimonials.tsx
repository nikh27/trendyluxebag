'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/ui/MotionWrapper';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  product: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Fashion Blogger',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      content: "The quality of my tote bag exceeded all expectations. The leather is buttery soft, and the craftsmanship is impeccable. It's become my go-to bag for both work and weekend outings.",
      rating: 5,
      product: 'Classic Leather Tote',
    },
    {
      id: 2,
      name: 'Ananya Patel',
      role: 'Marketing Executive',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      content: "I've received so many compliments on my crossbody bag! The attention to detail is remarkable, and it fits perfectly with my everyday essentials. Absolutely love it!",
      rating: 5,
      product: 'Milano Crossbody',
    },
    {
      id: 3,
      name: 'Meera Krishnan',
      role: 'Travel Enthusiast',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      content: "The weekender bag was perfect for my recent trip. Spacious, stylish, and durable. The quality is outstanding and worth every rupee. Will definitely be ordering more!",
      rating: 5,
      product: 'Voyager Weekender',
    },
    {
      id: 4,
      name: 'Riya Gupta',
      role: 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
      content: "Finally found a bag that transitions seamlessly from office to evening events. The clutch is elegant, compact, and the gold hardware adds just the right touch of luxury.",
      rating: 5,
      product: 'Evening Clutch',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <FadeIn className="text-center mb-14 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4"
          >
            Customer Love
          </motion.span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            What Our Customers Say
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from women who have made our bags part of their everyday journey
          </p>
        </FadeIn>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Large quote mark decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-10 -left-10 text-9xl font-serif text-accent pointer-events-none select-none"
          >
            "
          </motion.div>

          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute w-full"
              >
                <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-luxury">
                  {/* Rating stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-6 h-6 text-accent fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  {/* Testimonial content */}
                  <blockquote className="text-center mb-8">
                    <p className="font-body text-lg lg:text-xl text-foreground leading-relaxed italic">
                      "{testimonials[activeIndex].content}"
                    </p>
                  </blockquote>

                  {/* Product tag */}
                  <div className="flex justify-center mb-6">
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      Purchased: {testimonials[activeIndex].product}
                    </span>
                  </div>

                  {/* Author info */}
                  <div className="flex items-center justify-center gap-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-accent/20"
                    >
                      <AppImage
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="text-left">
                      <p className="font-heading text-lg font-semibold text-foreground">
                        {testimonials[activeIndex].name}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-accent' : 'bg-muted-foreground/30'
                }`}
              >
                {index === activeIndex && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-16 -right-16 justify-between pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDirection(-1);
                setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="w-12 h-12 rounded-full bg-card shadow-luxury flex items-center justify-center pointer-events-auto hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDirection(1);
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
              }}
              className="w-12 h-12 rounded-full bg-card shadow-luxury flex items-center justify-center pointer-events-auto hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
