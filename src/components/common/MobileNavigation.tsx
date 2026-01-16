'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface MobileNavigationProps {
  showCartBadge?: boolean;
  cartItemCount?: number;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  className?: string;
}

const MobileNavigation = ({
  showCartBadge = false,
  cartItemCount = 0,
  onAddToCart,
  onBuyNow,
  className = '',
}: MobileNavigationProps) => {
  const pathname = usePathname();

  const isProductDetailPage = pathname === '/product-detail';
  const isAdminPage = pathname?.startsWith('/admin');

  const customerNavItems = [
    { label: 'Home', path: '/home', icon: 'HomeIcon' },
    { label: 'Shop', path: '/product-listing', icon: 'ShoppingBagIcon' },
    { label: 'Search', path: '/search', icon: 'MagnifyingGlassIcon' },
    { label: 'Account', path: '/account', icon: 'UserIcon' },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'ChartBarIcon' },
    { label: 'Products', path: '/admin-product-management', icon: 'ShoppingBagIcon' },
    { label: 'Users', path: '/admin-user-management', icon: 'UsersIcon' },
    { label: 'Settings', path: '/admin-settings', icon: 'Cog6ToothIcon' },
  ];

  const navItems = isAdminPage ? adminNavItems : customerNavItems;

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  if (isProductDetailPage && onAddToCart && onBuyNow) {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-navigation bg-card border-t border-border shadow-luxury-lg md:hidden ${className}`}
      >
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={onAddToCart}
            className="flex-1 h-12 px-6 bg-muted text-foreground rounded-luxury font-body text-base font-medium transition-luxury hover:bg-muted/80 active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <Icon name="ShoppingBagIcon" size={20} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={onBuyNow}
            className="flex-1 h-12 px-6 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <Icon name="BoltIcon" size={20} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-navigation bg-card border-t border-border shadow-luxury-lg md:hidden ${className}`}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = isActivePath(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-luxury ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon as any} size={24} />
                {item.icon === 'ShoppingBagIcon' && showCartBadge && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground rounded-full caption text-xs flex items-center justify-center font-medium">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </div>
              <span className="caption text-xs mt-1 font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
        <Link
          href="/product-listing"
          className="flex flex-col items-center gap-1 transition-luxury hover:text-primary"
        >
          <Icon name="ShoppingBagIcon" size={24} />
          <span className="caption text-xs">Products</span>
        </Link>
        <Link
          href="/favorites"
          className="flex flex-col items-center gap-1 transition-luxury hover:text-primary"
        >
          <Icon name="HeartIcon" size={24} />
          <span className="caption text-xs">Favorites</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;