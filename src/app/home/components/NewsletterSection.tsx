'use client';

import { useState } from 'react';
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
      }, 3000);
    }
  };

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto bg-card rounded-luxury p-8 lg:p-12 shadow-luxury text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="EnvelopeIcon" size={32} className="text-accent" />
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Our Exclusive Community
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to receive early access to new collections, exclusive offers, and style inspiration delivered to your inbox
          </p>
          
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 text-success">
              <Icon name="CheckCircleIcon" size={24} variant="solid" />
              <span className="font-body text-lg font-medium">
                Thank you for subscribing!
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 h-14 px-6 bg-input border border-border rounded-luxury font-body text-base transition-luxury focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <button
                  type="submit"
                  className="h-14 px-8 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97] whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="caption text-muted-foreground mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;