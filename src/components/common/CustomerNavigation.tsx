'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { onAuthChange, logout } from '@/services/authService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';


interface CustomerNavigationProps {
  className?: string;
}

const CustomerNavigation = ({ className = '' }: CustomerNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Listen to Firebase auth state
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
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
            <Link
              href="/favorites"
              className="p-2 rounded-luxury transition-luxury hover:bg-muted"
              aria-label="Favorites"
            >
              <Icon name="HeartIcon" size={24} />
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-luxury transition-luxury hover:bg-muted"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {(user.fullName && user.fullName.charAt(0).toUpperCase()) || (user.name && user.name.charAt(0).toUpperCase()) || 'U'}
                    </span>
                  </div>
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-luxury-lg z-50 py-2">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="font-medium text-foreground">{user.fullName || user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-all"
                      >
                        <Icon name="UserIcon" size={18} />
                        <span className="text-sm">My Account</span>
                      </Link>
                      <Link
                        href="/favorites"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-all"
                      >
                        <Icon name="HeartIcon" size={18} />
                        <span className="text-sm">Favorites</span>
                      </Link>
                      <div className="border-t border-border my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-error/10 text-error transition-all"
                      >
                        <Icon name="ArrowRightOnRectangleIcon" size={18} />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-foreground hover:text-primary font-medium transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
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