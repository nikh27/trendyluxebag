import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: 'trendyluxebag - Luxury Handbags Collection',
    description: 'Discover our exclusive collection of trendy luxury handbags. Premium quality, timeless designs, and exceptional craftsmanship.',
    icons: {
        icon: [
            { url: '/favicon.ico', type: 'image/x-icon' },
            { url: '/icon.png', type: 'image/png', sizes: '192x192' },
        ],
        apple: [
            { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased" suppressHydrationWarning>
                <FavoritesProvider>
                    {children}
                </FavoritesProvider>

            </body>
        </html>
    );
}
