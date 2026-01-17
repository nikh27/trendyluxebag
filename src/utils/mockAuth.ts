// Mock Authentication Utility
// This will be replaced with Clerk in the future

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export const mockLogin = (email: string, password: string): User | null => {
    // Simple validation for demo
    if (email && password.length >= 6) {
        const user: User = {
            id: '1',
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email: email,
            avatar: '/images/default-avatar.png'
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    return null;
};

export const mockSignup = (name: string, email: string, password: string): User | null => {
    if (name && email && password.length >= 6) {
        const user: User = {
            id: Date.now().toString(),
            name: name,
            email: email,
            avatar: '/images/default-avatar.png'
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    return null;
};

export const mockLogout = (): void => {
    localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
    return getCurrentUser() !== null;
};
