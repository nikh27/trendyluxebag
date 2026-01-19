# TrendyLuxeBag 🎒

A modern, full-featured e-commerce platform for luxury handbags built with Next.js 15, Firebase, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-11.0-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### User Features
- 🛍️ Browse luxury handbags with advanced filtering and sorting
- 🔍 Product search with real-time results
- ❤️ Add products to favorites/wishlist
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎨 Modern UI with smooth animations and transitions
- 🔐 Google Authentication for secure login
- 👤 User profile management
- 📧 Newsletter subscription
- 🏷️ Category-based browsing (Tote Bags, Clutches, Shoulder Bags, etc.)

### Admin Features
- 📊 Comprehensive admin dashboard
- 👥 User management (roles, status control)
- 🛒 Product management (CRUD operations)
- 📁 Category management
- 🖼️ Image management for products
- 📝 Bulk operations (delete, status change)
- 🔍 Advanced filtering and search
- 📱 Mobile-optimized admin interface

## 🛠️ Tech Stack

**Frontend:**
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Heroicons](https://heroicons.com/) - Beautiful icons

**Backend & Database:**
- [Firebase Authentication](https://firebase.google.com/docs/auth) - User authentication
- [Cloud Firestore](https://firebase.google.com/docs/firestore) - NoSQL database
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - Server-side operations

**State Management:**
- React Context API for favorites/wishlist
- Local state with React hooks

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Firebase project set up
- Git for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trendy-luxebag.git
cd trendy-luxebag
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Google provider)
3. Create a Firestore Database
4. Download your Firebase configuration

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 5. Firestore Security Rules

Deploy the security rules from `firestore.rules`:

1. Go to Firebase Console → Firestore Database → Rules
2. Copy the contents of `firestore.rules`
3. Paste and publish

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
trendy-luxebag/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── account/              # User account page
│   │   ├── admin-product-management/  # Product management
│   │   ├── admin-user-management/     # User management
│   │   ├── admin-user-profile/   # Admin user profile viewer
│   │   ├── favorites/            # User wishlist
│   │   ├── home/                 # Homepage components
│   │   ├── product-detail/       # Product detail page
│   │   ├── product-listing/      # Product listing/category page
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── auth/                 # Authentication components
│   │   ├── common/               # Shared components
│   │   └── ui/                   # UI components
│   ├── contexts/                 # React contexts
│   ├── lib/                      # Firebase configuration
│   ├── services/                 # API services
│   ├── styles/                   # Global styles
│   └── utils/                    # Utility functions
├── public/                       # Static assets
├── firestore.rules               # Firestore security rules
└── package.json
```

## 🎯 Key Features Explained

### Authentication
- Google OAuth integration using Firebase Auth
- Protected routes for admin features
- Role-based access control (user/admin)

### Product Management
- Full CRUD operations for products
- Multi-image support with alt text
- Category assignment with dynamic slugs
- Product tags (New, Bestseller, Limited, Best Sale)
- Discount pricing support
- Bulk operations (delete, status change)

### User Management
- View all registered users
- Change user roles (user ↔ admin)
- Change user status (active/inactive/suspended)
- View user profiles and activity

### Favorites System
- Add/remove products to favorites
- Persistent across sessions
- Synced with user profile

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🎨 Customization

### Styling
The project uses Tailwind CSS with a custom design system defined in `globals.css`:
- Custom color palette
- Luxury-themed border radius
- Custom shadows and transitions

### Adding Categories
Update categories in Firebase Console or through the admin panel.

### Adding Products
Use the admin panel at `/admin-product-management` to add products with:
- Product name and description
- Category selection
- Pricing and discounts
- Multiple images
- Key highlights
- Specifications
- Product tags

## 📦 Database Collections

### Users Collection
```typescript
{
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  favorites?: string[];
  createdAt: Timestamp;
}
```

### Products Collection
```typescript
{
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discount?: number;
  images: Array<{url: string; alt: string}>;
  keyHighlights?: string[];
  specifications?: Record<string, string>;
  tags?: {isNew, isBestseller, isLimited, isBestSale};
  status: 'active' | 'draft' | 'archived';
  createdAt: Timestamp;
}
```

### Categories Collection
```typescript
{
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
}
```

## 🔐 Admin Access

To make a user an admin:

1. User must sign up via Google Authentication
2. Go to Firebase Console → Firestore
3. Find the user in the `users` collection
4. Update their `role` field to `"admin"`

Alternatively, use the User Management panel if you're already an admin.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Mobile favorites button requires proper z-index for touch events
- Category filters need slug-to-name mapping for proper filtering
- Bulk operations require proper Firestore permissions

## 📧 Support

For support, email nikhilpandey@example.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Firebase for backend infrastructure
- Tailwind CSS for the styling system
- Heroicons for the icon library

---

**Made with ❤️ by Nikhil Pandey**
