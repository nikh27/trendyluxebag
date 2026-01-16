'use client';

import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import QuickActionCard from './QuickActionCard';
import ActivityItem from './ActivityItem';

interface MetricData {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  href: string;
  variant: 'primary' | 'secondary' | 'accent';
}

interface Activity {
  id: string;
  type: 'product' | 'user' | 'system';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const metrics: MetricData[] = [
    {
      title: 'Total Products',
      value: '248',
      icon: 'ShoppingBagIcon',
      trend: { value: 12, isPositive: true },
      description: 'Active inventory items'
    },
    {
      title: 'Total Users',
      value: '1,847',
      icon: 'UsersIcon',
      trend: { value: 8, isPositive: true },
      description: 'Registered customers'
    },
    {
      title: 'Monthly Sales',
      value: '$124,580',
      icon: 'ChartBarIcon',
      trend: { value: 15, isPositive: true },
      description: 'Revenue this month'
    },
    {
      title: 'Pending Orders',
      value: '34',
      icon: 'ClockIcon',
      trend: { value: 3, isPositive: false },
      description: 'Awaiting processing'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'Add New Product',
      description: 'Create and publish new luxury bag listings',
      icon: 'PlusCircleIcon',
      href: '/admin-product-management',
      variant: 'primary'
    },
    {
      title: 'Manage Users',
      description: 'View and update customer accounts',
      icon: 'UsersIcon',
      href: '/admin-user-management',
      variant: 'secondary'
    },
    {
      title: 'View Reports',
      description: 'Access sales analytics and insights',
      icon: 'DocumentTextIcon',
      href: '/admin-dashboard',
      variant: 'accent'
    }
  ];

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'product',
      title: 'New Product Added',
      description: 'Elegant Leather Tote Bag - Caramel Brown added to inventory',
      timestamp: '2 hours ago',
      icon: 'ShoppingBagIcon'
    },
    {
      id: '2',
      type: 'user',
      title: 'New User Registration',
      description: 'Sarah Johnson registered as a new customer',
      timestamp: '4 hours ago',
      icon: 'UserPlusIcon'
    },
    {
      id: '3',
      type: 'product',
      title: 'Product Updated',
      description: 'Classic Crossbody Bag - Black price updated to $189.00',
      timestamp: '6 hours ago',
      icon: 'ShoppingBagIcon'
    },
    {
      id: '4',
      type: 'system',
      title: 'System Notification',
      description: 'Monthly inventory report is ready for review',
      timestamp: '8 hours ago',
      icon: 'BellIcon'
    },
    {
      id: '5',
      type: 'user',
      title: 'User Role Updated',
      description: 'Emma Davis promoted to admin privileges',
      timestamp: '1 day ago',
      icon: 'UserPlusIcon'
    }
  ];

  if (!isHydrated) {
    return (
      <div className="flex-1 p-6 lg:p-12">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* Skeleton Loading */}
          <div className="h-10 bg-muted rounded-luxury w-64 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 bg-muted rounded-luxury animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 lg:p-12 overflow-y-auto scrollbar-luxury">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-heading text-4xl font-semibold text-foreground mb-2">
            Dashboard Overview
          </h1>
          <p className="font-body text-base text-muted-foreground">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Recent Activity
            </h2>
            <button className="caption text-primary font-medium transition-luxury hover:text-primary/80">
              View All
            </button>
          </div>
          <div className="bg-card rounded-luxury shadow-luxury-sm divide-y divide-border">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-luxury p-6 shadow-luxury-sm">
            <h3 className="font-body text-lg font-semibold text-foreground mb-4">
              Top Categories
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Tote Bags', count: 89, percentage: 36 },
                { name: 'Shoulder Bags', count: 67, percentage: 27 },
                { name: 'Crossbody', count: 52, percentage: 21 },
                { name: 'Clutches', count: 40, percentage: 16 }
              ].map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-foreground">{category.name}</span>
                    <span className="caption text-muted-foreground">{category.count} items</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-luxury"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-luxury p-6 shadow-luxury-sm">
            <h3 className="font-body text-lg font-semibold text-foreground mb-4">
              System Status
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Database', status: 'Operational', color: 'text-success' },
                { label: 'Image Storage', status: 'Operational', color: 'text-success' },
                { label: 'Payment Gateway', status: 'Operational', color: 'text-success' },
                { label: 'Email Service', status: 'Operational', color: 'text-success' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-body text-sm text-foreground">{item.label}</span>
                  <span className={`caption font-medium ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInteractive;