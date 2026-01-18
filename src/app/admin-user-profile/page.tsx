'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminNavigation from '@/components/common/AdminNavigation';
import AdminRoute from '@/components/auth/AdminRoute';
import Icon from '@/components/ui/AppImage';

interface User {
    id: string;
    fullName?: string;
    name?: string;
    email: string;
    photoURL?: string;
    avatar?: string;
    role: 'user' | 'admin';
    phoneNumber?: string;
    favorites?: string[];
    createdAt: any;
    updatedAt?: any;
}

export default function AdminUserProfilePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const userId = searchParams.get('id');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            loadUser(userId);
        } else {
            router.push('/admin-user-management');
        }
    }, [userId, router]);

    const loadUser = async (id: string) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', id));
            if (userDoc.exists()) {
                setUser({ id: userDoc.id, ...userDoc.data() } as User);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        try {
            return timestamp.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'N/A';
        }
    };

    if (loading) {
        return (
            <AdminRoute>
                <div className="min-h-screen bg-background">
                    <AdminNavigation />
                    <main className="ml-20 lg:ml-72 p-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="h-8 bg-muted rounded-luxury animate-pulse w-64 mb-8" />
                            <div className="bg-card rounded-luxury p-8 space-y-6">
                                <div className="h-24 w-24 rounded-full bg-muted animate-pulse" />
                                <div className="space-y-4">
                                    <div className="h-6 bg-muted rounded animate-pulse w-48" />
                                    <div className="h-4 bg-muted rounded animate-pulse w-64" />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </AdminRoute>
        );
    }

    if (!user) {
        return (
            <AdminRoute>
                <div className="min-h-screen bg-background">
                    <AdminNavigation />
                    <main className="ml-20 lg:ml-72 p-8">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="font-heading text-3xl font-semibold text-foreground mb-8">
                                User Not Found
                            </h1>
                            <p className="text-muted-foreground">
                                The user you are looking for does not exist.
                            </p>
                            <button
                                onClick={() => router.push('/admin-user-management')}
                                className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-luxury hover:opacity-90 transition-luxury"
                            >
                                Back to User Management
                            </button>
                        </div>
                    </main>
                </div>
            </AdminRoute>
        );
    }

    return (
        <AdminRoute>
            <div className="min-h-screen bg-background">
                <AdminNavigation />
                <main className="ml-20 lg:ml-72 p-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="font-heading text-3xl font-semibold text-foreground">
                                User Profile
                            </h1>
                            <button
                                onClick={() => router.push('/admin-user-management')}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-luxury"
                            >
                                ← Back to Users
                            </button>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-card rounded-luxury shadow-luxury-sm overflow-hidden">
                            {/* Header Section */}
                            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8">
                                <div className="flex items-start gap-6">
                                    {/* Avatar */}
                                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-3xl font-semibold text-foreground border-4 border-card flex-shrink-0">
                                        {user.photoURL || user.avatar ? (
                                            <img
                                                src={user.photoURL || user.avatar}
                                                alt={user.fullName || user.name || 'User'}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            (user.fullName || user.name || user.email)[0].toUpperCase()
                                        )}
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1">
                                        <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
                                            {user.fullName || user.name || 'Unknown User'}
                                        </h2>
                                        <p className="text-muted-foreground mb-4">{user.email}</p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card">
                                            <span className={`w-2 h-2 rounded-full ${user.role === 'admin' ? 'bg-primary' : 'bg-success'}`} />
                                            <span className="text-sm font-medium capitalize">{user.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Contact Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-heading text-lg font-semibold text-foreground">
                                            Contact Information
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-muted-foreground">Email</label>
                                                <p className="font-body text-foreground">{user.email}</p>
                                            </div>
                                            {user.phoneNumber && (
                                                <div>
                                                    <label className="text-sm text-muted-foreground">Phone</label>
                                                    <p className="font-body text-foreground">{user.phoneNumber}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Account Details */}
                                    <div className="space-y-4">
                                        <h3 className="font-heading text-lg font-semibold text-foreground">
                                            Account Details
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-muted-foreground">User ID</label>
                                                <p className="font-body text-foreground font-mono text-sm">{user.id}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-muted-foreground">Registered</label>
                                                <p className="font-body text-foreground">{formatDate(user.createdAt)}</p>
                                            </div>
                                            {user.updatedAt && (
                                                <div>
                                                    <label className="text-sm text-muted-foreground">Last Updated</label>
                                                    <p className="font-body text-foreground">{formatDate(user.updatedAt)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Favorites */}
                                {user.favorites && user.favorites.length > 0 && (
                                    <div className="pt-6 border-t border-border">
                                        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                                            Favorites
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {user.favorites.length} product{user.favorites.length !== 1 ? 's' : ''} favorited
                                        </p>
                                    </div>
                                )}

                                {/* Admin Actions */}
                                <div className="pt-6 border-t border-border flex gap-4">
                                    <button
                                        onClick={() => {
                                            if (confirm(`Change ${user.fullName || user.name}'s role to ${user.role === 'admin' ? 'user' : 'admin'}?`)) {
                                                // TODO: Implement role change
                                                alert('Role change functionality to be implemented');
                                            }
                                        }}
                                        className="px-6 py-3 bg-primary text-primary-foreground rounded-luxury hover:opacity-90 transition-luxury"
                                    >
                                        {user.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}
                                    </button>
                                    <button
                                        onClick={() => router.push('/admin-user-management')}
                                        className="px-6 py-3 bg-card border border-border text-foreground rounded-luxury hover:bg-muted transition-luxury"
                                    >
                                        Back to List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AdminRoute>
    );
}
