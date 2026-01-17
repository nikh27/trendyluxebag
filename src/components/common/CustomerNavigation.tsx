'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { getCurrentUser, mockLogout, type User } from '@/utils/mockAuth';


interface CustomerNavigationProps {
  className?: string;
}

const CustomerNavigation = ({ className = '' }: CustomerNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    mockLogout();
    setUser(null);
    setIsProfileOpen(false);
    router.push('/home');
  };

  const navigationItems = [
    { label: 'Home', path: '/home', icon: 'HomeIcon' },
    { label: 'Shop', path: '/product-listing', icon: 'ShoppingBagIcon' },
    { label: 'Product', path: '/product-detail', icon: 'SparklesIcon' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-navigation transition-luxury ${isScrolled ? 'bg-card shadow-luxury' : 'bg-background'
          } ${className}`}
      >
        <nav className="flex items-center justify-between h-20 px-6 lg:px-12 max-w-[1920px] mx-auto">
          {/* Logo */}
          <Link
            href="/home"
            className="flex items-center gap-3 transition-luxury hover:opacity-80"
            onClick={handleLinkClick}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="TrendyLuxeBag Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-heading text-2xl font-semibold text-foreground tracking-tight">
              TrendyLuxeBag
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/product-listing"
              className="font-body text-base text-foreground transition-luxury hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/favorites"
              className="font-body text-base text-foreground transition-luxury hover:text-primary"
            >
              Favorites
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              className="p-2 rounded-luxury transition-luxury hover:bg-muted"
              aria-label="Search"
            >
              <Icon name="MagnifyingGlassIcon" size={24} />
            </button>
            <button
              className="p-2 rounded-luxury transition-luxury hover:bg-muted"
              aria-label="Account"
            >
              <Icon name="UserIcon" size={24} />
            </button>
            <button
              className="relative p-2 rounded-luxury transition-luxury hover:bg-muted"
              aria-label="Shopping cart"
            >
              <Icon name="ShoppingBagIcon" size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-luxury transition-luxury hover:bg-muted"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[90] bg-background md:hidden"
          style={{ top: '80px' }}
        >
          <nav className="flex flex-col h-full overflow-y-auto">
            {/* Navigation Items */}
            <div className="flex flex-col p-6 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-4 p-4 rounded-luxury transition-luxury ${isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                    }`}
                >
                  <Icon name={item.icon as any} size={24} />
                  <span className="font-body text-lg font-medium">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="mt-auto border-t border-border p-6 space-y-2">
              <button className="flex items-center gap-4 w-full p-4 rounded-luxury transition-luxury hover:bg-muted">
                <Icon name="MagnifyingGlassIcon" size={24} />
                <span className="font-body text-lg font-medium">Search</span>
              </button>
              <button className="flex items-center gap-4 w-full p-4 rounded-luxury transition-luxury hover:bg-muted">
                <Icon name="UserIcon" size={24} />
                <span className="font-body text-lg font-medium">Account</span>
              </button>
              <button className="flex items-center gap-4 w-full p-4 rounded-luxury transition-luxury hover:bg-muted">
                <Icon name="ShoppingBagIcon" size={24} />
                <span className="font-body text-lg font-medium">Cart</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default CustomerNavigation;