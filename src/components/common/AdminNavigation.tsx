'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface AdminNavigationProps {
    isCollapsed?: boolean;
    className?: string;
}

const AdminNavigation = ({
    isCollapsed = false,
    className = '',
}: AdminNavigationProps) => {
    // Initialize from localStorage
    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('adminSidebarCollapsed');
            return saved ? JSON.parse(saved) : isCollapsed;
        }
        return isCollapsed;
    });
    const pathname = usePathname();

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('adminSidebarCollapsed', JSON.stringify(collapsed));
    }, [collapsed]);

    const navigationItems = [
        {
            label: 'Dashboard',
            path: '/admin-dashboard',
            icon: 'ChartBarIcon',
            description: 'Overview & Analytics',
        },
        {
            label: 'Products',
            path: '/admin-product-management',
            icon: 'ShoppingBagIcon',
            description: 'Manage Inventory',
        },
        {
            label: 'Users',
            path: '/admin-user-management',
            icon: 'UsersIcon',
            description: 'User Management',
        },
        {
            label: 'Shop',
            path: '/product-listing',
            icon: 'ShoppingCartIcon',
            description: 'View Shop',
        },
        {
            label: 'Favorites',
            path: '/favorites',
            icon: 'HeartIcon',
            description: 'View Favorites',
        },
    ];

    const isActivePath = (path: string) => {
        return pathname === path;
    };

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'
                } ${className}`}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-border">
                    {!collapsed && (
                        <Link
                            href="/admin-dashboard"
                            className="flex items-center gap-3 transition-luxury hover:opacity-80"
                        >
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <img
                                    src="/images/logo.png"
                                    alt="TrendyLuxeBag Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="font-heading text-xl font-semibold text-foreground">
                                Admin
                            </span>
                        </Link>
                    )}
                    <button
                        onClick={handleToggleCollapse}
                        className="p-2 rounded-luxury transition-luxury hover:bg-muted"
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        <Icon
                            name={collapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'}
                            size={20}
                        />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto scrollbar-luxury p-4">
                    {/* Back to Home */}
                    <Link
                        href="/home"
                        className="flex items-center gap-4 p-4 mb-4 rounded-luxury transition-luxury hover:bg-muted border border-border"
                        title={collapsed ? 'Back to Home' : undefined}
                    >
                        <Icon name="HomeIcon" size={24} />
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <div className="font-body text-base font-medium">
                                    Back to Home
                                </div>
                                <div className="caption text-sm text-muted-foreground">
                                    Customer View
                                </div>
                            </div>
                        )}
                    </Link>

                    <div className="space-y-2">
                        {navigationItems.map((item) => {
                            const isActive = isActivePath(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-4 p-4 rounded-luxury transition-luxury ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-luxury-sm'
                                        : 'hover:bg-muted'
                                        }`}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <Icon name={item.icon as any} size={24} />
                                    {!collapsed && (
                                        <div className="flex-1 min-w-0">
                                            <div className="font-body text-base font-medium truncate">
                                                {item.label}
                                            </div>
                                            <div
                                                className={`caption text-sm truncate ${isActive
                                                    ? 'text-primary-foreground/70'
                                                    : 'text-muted-foreground'
                                                    }`}
                                            >
                                                {item.description}
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="border-t border-border p-4">
                    <button
                        className={`flex items-center gap-4 w-full p-4 rounded-luxury transition-luxury hover:bg-muted ${collapsed ? 'justify-center' : ''
                            }`}
                        title={collapsed ? 'Settings' : undefined}
                    >
                        <Icon name="Cog6ToothIcon" size={24} />
                        {!collapsed && (
                            <span className="font-body text-base font-medium">Settings</span>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AdminNavigation;