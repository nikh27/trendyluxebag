// Firebase Category Service
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Get all categories
export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, orderBy('displayOrder', 'asc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        })) as Category[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

// Get active categories only
export const getActiveCategories = async (): Promise<Category[]> => {
    const categories = await getAllCategories();
    return categories.filter(cat => cat.isActive);
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<Category | null> => {
    try {
        const docRef = doc(db, 'categories', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
                updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            } as Category;
        }
        return null;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
};

// Get category by slug
export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
    const categories = await getAllCategories();
    return categories.find(cat => cat.slug === slug) || null;
};

// Add new category
export const addCategory = async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
        const categoriesRef = collection(db, 'categories');
        const docRef = await addDoc(categoriesRef, {
            ...category,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

// Update category
export const updateCategory = async (id: string, updates: Partial<Category>): Promise<void> => {
    try {
        const docRef = doc(db, 'categories', id);
        const { createdAt, updatedAt, ...updateData } = updates;
        await updateDoc(docRef, {
            ...updateData,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Delete category
export const deleteCategory = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, 'categories', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

// Seed default categories
export const seedDefaultCategories = async (): Promise<void> => {
    const defaultCategories = [
        { name: 'Tote Bags', slug: 'tote-bags', displayOrder: 1, isActive: true },
        { name: 'Clutches', slug: 'clutches', displayOrder: 2, isActive: true },
        { name: 'Shoulder Bags', slug: 'shoulder-bags', displayOrder: 3, isActive: true },
        { name: 'Crossbody', slug: 'crossbody', displayOrder: 4, isActive: true },
        { name: 'Backpacks', slug: 'backpacks', displayOrder: 5, isActive: true },
        { name: 'Travel Bags', slug: 'travel-bags', displayOrder: 6, isActive: true },
    ];

    try {
        // Check if categories already exist
        const existing = await getAllCategories();
        if (existing.length > 0) {
            console.log('Categories already exist, skipping seed');
            return;
        }

        // Add all default categories
        for (const category of defaultCategories) {
            await addCategory(category);
        }
        console.log('Default categories seeded successfully!');
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
};
