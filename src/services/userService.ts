// Firebase User Service
import {
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface User {
    id: string;
    name?: string;
    fullName?: string;
    email: string;
    avatar?: string;
    photoURL?: string;
    role: 'user' | 'admin';
    phoneNumber?: string;
    favorites?: string[];
    createdAt: string;
    updatedAt?: string;
}

// Get all users from Firestore
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.fullName || data.name || 'Unknown User',
                fullName: data.fullName || data.name,
                email: data.email || '',
                avatar: data.photoURL || data.avatar || '/images/default-avatar.png',
                photoURL: data.photoURL || data.avatar,
                role: data.role || 'user',
                phoneNumber: data.phoneNumber,
                favorites: data.favorites || [],
                createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
                updatedAt: data.updatedAt?.toDate?.()?.toISOString(),
            };
        }) as User[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

// Update user role
export const updateUserRole = async (userId: string, role: 'user' | 'admin'): Promise<void> => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { role });
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};

// Update user status
export const updateUserStatus = async (userId: string, status: 'active' | 'inactive' | 'suspended'): Promise<void> => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { status });
    } catch (error) {
        console.error('Error updating user status:', error);
        throw error;
    }
};

// Delete user
export const deleteUser = async (userId: string): Promise<void> => {
    try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
