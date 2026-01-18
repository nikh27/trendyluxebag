'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

interface NewsletterSectionProps {
  className?: string;
}

const NewsletterSection = ({ className = '' }: NewsletterSectionProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 4000);
    }
  };

  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Content Container */}
          <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl rounded-3xl p-10 lg:p-16 shadow-2xl border border-border/50 relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Icon name="EnvelopeIcon" size={36} className="text-white" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 text-center"
              >
                Stay in the Loop
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-center leading-relaxed"
              >
                Subscribe to our newsletter and be the first to discover new trending bags,
                exclusive deals, and style inspiration delivered straight to your inbox.
              </motion.p>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center gap-3 py-8"
                >
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircleIcon" size={32} className="text-success" variant="solid" />
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-2xl font-semibold text-foreground mb-1">
                      You're All Set!
                    </p>
                    <p className="text-muted-foreground">
                      Thanks for subscribing. Check your inbox soon!
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  onSubmit={handleSubmit}
                  className="max-w-xl mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Icon
                        name="EnvelopeIcon"
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full h-14 pl-12 pr-4 bg-background/50 border-2 border-border rounded-xl font-body text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="h-14 px-8 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-body text-base font-semibold transition-all hover:shadow-xl hover:shadow-primary/25 whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      Subscribe Now
                      <Icon name="ArrowRightIcon" size={18} />
                    </motion.button>
                  </div>

                  {/* Privacy Note */}
                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Icon name="ShieldCheckIcon" size={16} />
                    <span>We respect your privacy. Unsubscribe anytime.</span>
                  </div>
                </motion.form>
              )}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-border/50"
              >
                <div className="text-center">
                  <p className="font-heading text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">Subscribers</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="font-heading text-2xl font-bold text-foreground">Weekly</p>
                  <p className="text-sm text-muted-foreground">Updates</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="font-heading text-2xl font-bold text-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Free</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
