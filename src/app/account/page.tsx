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
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Listen to auth state changes
        const unsubscribe = onAuthChange(async (firebaseUser) => {
            if (!firebaseUser) {
                router.push('/login');
            } else {
                // Get user data from Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser(userData);
                    setFormData({
                        name: userData.fullName || userData.name || '',
                        email: userData.email || '',
                        phone: userData.phoneNumber || '',
                    });
                }
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await logout();
        router.push('/home');
    };

    const handleSaveProfile = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            // Update user document in Firestore
            await updateDoc(doc(db, 'users', user.id), {
                fullName: formData.name,
                phoneNumber: formData.phone,
                updatedAt: new Date(),
            });

            // Update local state
            setUser({
                ...user,
                fullName: formData.name,
                phoneNumber: formData.phone,
            });

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
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
                                            {(user.fullName && user.fullName.charAt(0).toUpperCase()) || (user.name && user.name.charAt(0).toUpperCase()) || 'U'}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-xl font-semibold text-foreground">{user.fullName || user.name}</h3>
                                        <p className="text-muted-foreground">{user.email}</p>
                                        {user.role === 'admin' && (
                                            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                                Admin
                                            </span>
                                        )}
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
                                            disabled
                                            className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground opacity-60 cursor-not-allowed"
                                        />
                                        <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed</p>
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
                                                disabled={isSaving}
                                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                                            >
                                                {isSaving ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        name: user.fullName || user.name || '',
                                                        email: user.email || '',
                                                        phone: user.phoneNumber || '',
                                                    });
                                                }}
                                                disabled={isSaving}
                                                className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-all disabled:opacity-50"
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
