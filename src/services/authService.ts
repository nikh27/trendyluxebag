// Firebase Authentication Service
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User as FirebaseUser,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}

// Sign up with email/password
export const signUp = async (
    name: string,
    email: string,
    password: string
): Promise<User> => {
    try {
        // Create auth user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Update profile with name
        await updateProfile(firebaseUser, { displayName: name });

        // Create user document in Firestore
        const user: User = {
            id: firebaseUser.uid,
            name: name,
            email: email,
            avatar: firebaseUser.photoURL || '/images/default-avatar.png',
            createdAt: new Date().toISOString(),
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), user);

        return user;
    } catch (error: any) {
        console.error('Signup error:', error);
        throw new Error(error.message);
    }
};

// Sign in with email/password
export const signIn = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

        if (userDoc.exists()) {
            return userDoc.data() as User;
        } else {
            // Create user doc if it doesn't exist
            const user: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                avatar: firebaseUser.photoURL || '/images/default-avatar.png',
                createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), user);
            return user;
        }
    } catch (error: any) {
        console.error('Sign in error:', error);
        throw new Error(error.message);
    }
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<User> => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const firebaseUser = userCredential.user;

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

        if (userDoc.exists()) {
            return userDoc.data() as User;
        } else {
            // Create new user
            const user: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                avatar: firebaseUser.photoURL || '/images/default-avatar.png',
                createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), user);
            return user;
        }
    } catch (error: any) {
        console.error('Google sign in error:', error);
        throw new Error(error.message);
    }
};

// Logout
export const logout = async (): Promise<void> => {
    await signOut(auth);
};

// Get current user
export const getCurrentUser = (): FirebaseUser | null => {
    return auth.currentUser;
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
