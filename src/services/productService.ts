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
    id: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    category: string;
    images: Array<{ url: string; alt: string }>;
    highlights?: string[];
    specifications?: Record<string, string>;
    link?: string;
    status: 'active' | 'draft' | 'archived';
    isNew?: boolean;
    isBestseller?: boolean;
    isLimited?: boolean;
    isBestSale?: boolean;
    createdAt: string;
}

// Get all active products
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('status', '==', 'active'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
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
        const { createdAt, ...updateData } = updates;
        await updateDoc(docRef, updateData);
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
