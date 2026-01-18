// Firebase Product Service
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Product {
    updatedAt: any;
    id: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    category: string;
    images: Array<{ url: string; alt: string }>;
    highlights?: string[];
    keyHighlights?: string[]; // Alternative field name
    specifications?: Record<string, string>;
    link?: string;
    productLink?: string; // Alternative field name
    status: 'active' | 'draft' | 'archived';
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
    tags?: {
        isNew?: boolean;
        isBestseller?: boolean;
        isLimited?: boolean;
        isBestSale?: boolean;
    };
    createdAt: string;
    updatedAt?: string;
}

// Get all products (no filter to avoid index requirement)
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
        })) as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
                updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString(),
            } as Product;
        }
        return null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

// Add new product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<string> => {
    try {
        const productsRef = collection(db, 'products');
        const docRef = await addDoc(productsRef, {
            ...product,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Update product
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
    try {
        const docRef = doc(db, 'products', id);
        const { createdAt, updatedAt, ...updateData } = updates;
        await updateDoc(docRef, {
            ...updateData,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('category', '==', category),
            where('status', '==', 'active')
        );
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        })) as Product[];
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
};

// Get all active categories
export async function getActiveCategories() {
    try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, where('status', '==', 'active'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Array<{
            id: string;
            name: string;
            description?: string;
            imageUrl?: string;
            productCount?: number;
            status: string;
        }>;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
