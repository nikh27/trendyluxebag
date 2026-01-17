'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { onAuthChange } from '@/services/authService';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (productId: string) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state and load favorites
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        console.log('👤 User logged in:', user.uid);
        setUserId(user.uid);
        await loadFavorites(user.uid);
      } else {
        console.log('👤 User logged out');
        setUserId(null);
        setFavorites([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadFavorites = async (uid: string) => {
    try {
      console.log('📥 Loading favorites for user:', uid);
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const userFavorites = data.favorites || [];
        console.log('✅ Loaded favorites:', userFavorites);
        setFavorites(userFavorites);
      } else {
        console.warn('⚠️ User document does not exist');
      }
    } catch (error) {
      console.error('❌ Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    if (!userId) {
      console.warn('⚠️ User not logged in - cannot add to favorites');
      return;
    }

    try {
      console.log('➕ Adding to favorites:', productId);

      // Optimistic update
      setFavorites((prev) => [...prev, productId]);

      // Check if user doc exists
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.error('❌ User document does not exist!');
        setFavorites((prev) => prev.filter(id => id !== productId));
        return;
      }

      // Update Firestore
      await updateDoc(userRef, {
        favorites: arrayUnion(productId)
      });

      console.log('✅ Added to favorites successfully');
    } catch (error) {
      console.error('❌ Error adding to favorites:', error);
      // Revert on error
      setFavorites((prev) => prev.filter(id => id !== productId));
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!userId) {
      console.warn('⚠️ User not logged in - cannot remove from favorites');
      return;
    }

    try {
      console.log('➖ Removing from favorites:', productId);

      // Optimistic update
      setFavorites((prev) => prev.filter((id) => id !== productId));

      // Update Firestore
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        favorites: arrayRemove(productId)
      });

      console.log('✅ Removed from favorites successfully');
    } catch (error) {
      console.error('❌ Error removing from favorites:', error);
      // Revert on error
      setFavorites((prev) => [...prev, productId]);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.includes(productId);
  };

  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};