'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthChange } from '@/services/authService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthChange(async (firebaseUser) => {
            if (!firebaseUser) {
                // Not logged in
                setIsAdmin(false);
                setIsLoading(false);
                router.push('/login');
                return;
            }

            try {
                // Check user role from Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const isUserAdmin = userData.role === 'admin';
                    setIsAdmin(isUserAdmin);

                    if (!isUserAdmin) {
                        // User is not admin, redirect to home
                        router.push('/home');
                    }
                } else {
                    // User doc doesn't exist
                    setIsAdmin(false);
                    router.push('/home');
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
                router.push('/home');
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Only render children if user is admin
    if (isAdmin) {
        return <>{children}</>;
    }

    // Don't render anything while redirecting
    return null;
};

export default AdminRoute;
