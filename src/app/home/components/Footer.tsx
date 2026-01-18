'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/product-listing' },
      { label: 'New Arrivals', href: '/product-listing' },
      { label: 'Best Sellers', href: '/product-listing' },
      { label: 'Sale', href: '/product-listing' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Our Story', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Feedback', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'CameraIcon', href: '#' },
    { name: 'Facebook', icon: 'UserGroupIcon', href: '#' },
    { name: 'Twitter', icon: 'ChatBubbleLeftIcon', href: '#' },
    { name: 'Pinterest', icon: 'PhotoIcon', href: '#' },
  ];

  return (
    <footer className={`bg-card border-t border-border ${className}`}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/home" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M20 4L8 12V28L20 36L32 28V12L20 4Z" fill="var(--color-primary)" />
                  <path d="M20 12L14 16V24L20 28L26 24V16L20 12Z" fill="var(--color-accent)" />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold text-foreground">
                TrendyLuxeBag
              </span>
            </Link>
            <p className="font-body text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Your curated destination for discovering trending luxury bags from top brands worldwide.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} TrendyLuxeBag. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 w-10 h-10 bg-accent text-accent-foreground rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow active:scale-95"
        aria-label="Scroll to top"
      >
        <Icon name="ArrowUpIcon" size={18} />
      </button>
    </footer>
  );
};

export default Footer;
