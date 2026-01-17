'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import CustomerNavigation from '@/components/common/CustomerNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';
import { logout, onAuthChange } from '@/services/authService';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AccountPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            router.push('/login');
        } else {
            setUser(currentUser);
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                phone: '',
            });
        }
    }, [router]);

    const handleLogout = () => {
        mockLogout();
        router.push('/home');
    };

    const handleSaveProfile = () => {
        if (user) {
            const updatedUser = { ...user, name: formData.name, email: formData.email };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEditing(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background">
            <CustomerNavigation />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-4xl font-bold text-foreground mb-2">My Account</h1>
                    <p className="text-muted-foreground">Manage your profile and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-luxury border border-border p-6 space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'profile'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-foreground'
                                    }`}
                            >
                                <Icon name="UserIcon" size={20} />
                                <span className="font-medium">Profile</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'orders'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-foreground'
                                    }`}
                            >
                                <Icon name="ShoppingBagIcon" size={20} />
                                <span className="font-medium">Orders</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('addresses')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'addresses'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-foreground'
                                    }`}
                            >
                                <Icon name="MapPinIcon" size={20} />
                                <span className="font-medium">Addresses</span>
                            </button>
                            <Link
                                href="/favorites"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground transition-all"
                            >
                                <Icon name="HeartIcon" size={20} />
                                <span className="font-medium">Favorites</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error/10 text-error transition-all"
                            >
                                <Icon name="ArrowRightOnRectangleIcon" size={20} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <div className="bg-card rounded-luxury border border-border p-6 sm:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-heading text-2xl font-semibold">Profile Information</h2>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all"
                                        >
                                            <Icon name="PencilIcon" size={16} />
                                            <span>Edit</span>
                                        </button>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-primary">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-xl font-semibold text-foreground">{user.name}</h3>
                                        <p className="text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="+92 300 1234567"
                                            className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>

                                    {isEditing && (
                                        <div className="flex gap-3 pt-4">
                                            <button
                                                onClick={handleSaveProfile}
                                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        name: user.name,
                                                        email: user.email,
                                                        phone: '',
                                                    });
                                                }}
                                                className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-card rounded-luxury border border-border p-6 sm:p-8">
                                <h2 className="font-heading text-2xl font-semibold mb-6">Order History</h2>
                                <div className="text-center py-12">
                                    <Icon name="ShoppingBagIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No orders yet</p>
                                    <Link
                                        href="/product-listing"
                                        className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="bg-card rounded-luxury border border-border p-6 sm:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-heading text-2xl font-semibold">Saved Addresses</h2>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all">
                                        <Icon name="PlusIcon" size={16} />
                                        <span>Add Address</span>
                                    </button>
                                </div>
                                <div className="text-center py-12">
                                    <Icon name="MapPinIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No saved addresses</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <MobileNavigation />
        </div>
    );
}
