# Admin Access Control

## Overview
This document describes the admin access control system implemented for TrendyLuxeBag.

## Features Implemented

### 1. Admin Route Protection
Created `AdminRoute` component (`src/components/auth/AdminRoute.tsx`) that:
- Checks if user is authenticated via Firebase
- Verifies user role from Firestore
- Redirects non-admin users to home page
- Redirects unauthenticated users to login page
- Shows loading state during authentication check

### 2. Admin Navigation Button
Added admin access button in the navigation bar (`src/components/common/CustomerNavigation.tsx`):
- Shows "Admin" button with shield icon in desktop navigation
- **Mobile Menu**: Added "Admin" link to the slide-out (hamburger) menu
- Only visible when `user.role === 'admin'`
- Also appears in the user profile dropdown menu
- Links to `/admin-dashboard`

### 3. Mobile Bottom Navigation
Updated `src/components/common/MobileNavigation.tsx`:
- Replaces the "Search" tab with an "Admin" tab for admin users
- Allows quick access to the Admin Dashboard from the bottom bar on mobile devices

### 3. Secured Admin Pages
All admin pages are now protected with the `AdminRoute` component:
- `/admin-dashboard` - Main admin dashboard
- `/admin-product-management` - Product and category management
- `/admin-user-management` - User account management  
- `/admin-user-profile` - Individual user profile view

## How It Works

### User Role Assignment
Users are assigned roles in Firestore:
```typescript
{
  role: 'user' | 'admin'
}
```

Default role is 'user'. Admin role must be set manually in Firestore.

### Route Protection Flow
1. User navigates to admin page
2. `AdminRoute` component checks authentication
3. If not authenticated → redirect to `/login`
4. If authenticated → fetch user data from Firestore
5. Check if `role === 'admin'`
6. If admin → render page
7. If not admin → redirect to `/home`

### Testing Admin Access
To test admin features:
1. Sign up/login to the application
2. Go to Firebase Console → Firestore Database
3. Find your user document in the `users` collection
4. Change the `role` field from `'user'` to `'admin'`
5. Refresh the page
6. Admin button should now appear in navigation

## Files Modified
- `src/components/auth/AdminRoute.tsx` (NEW)
- `src/components/common/CustomerNavigation.tsx`
- `src/app/admin-dashboard/page.tsx`
- `src/app/admin-product-management/page.tsx`
- `src/app/admin-user-management/page.tsx`
- `src/app/admin-user-profile/page.tsx`
- `src/app/home/components/HeroSection.tsx` (removed "View Categories" button)
