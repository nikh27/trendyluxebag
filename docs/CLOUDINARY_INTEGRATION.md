# Cloudinary Image Upload Integration

## Overview
This project now supports direct image uploads to Cloudinary for product management. Admin users can upload images from their device, which are automatically stored in Cloudinary and added to products.

## Setup

### Environment Variables
The following environment variables have been added to `.env.local`:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dhucxjkgt
NEXT_PUBLIC_CLOUDINARY_API_KEY=492859812695573
CLOUDINARY_API_SECRET=s264ZFuo8oZcLFWCzgnKCgx7Zjg
```

### Dependencies
- `next-cloudinary` - Client-side Cloudinary components for Next.js
- `cloudinary` - Server-side Cloudinary SDK

## Features

### 1. Image Upload Component (`CloudinaryImageUpload.tsx`)
A reusable component for uploading images to Cloudinary with the following features:
- **Drag & drop** support (via file input)
- **File validation** (image types only, max 5MB)
- **Real-time preview** with upload progress
- **Error handling** with user-friendly messages
- **Auto-alt text** based on product name

### 2. Upload API Route (`/api/upload`)
Server-side API endpoint that:
- Accepts image files via FormData
- Converts to base64 for Cloudinary upload
- Stores in `trendyluxebag/products` folder
- Returns secure URL and public ID

### 3. Product Edit Modal Integration
The admin product management modal now includes:
- **Upload from Device** - Direct upload using Cloudinary
- **Manual URL Input** - Traditional URL input (still available)
- **Enhanced Image Gallery** - Shows uploaded images with:
  - Primary image indicator
  - Alt text on hover
  - Delete functionality

## Usage

### In Admin Product Management
1. Navigate to `/admin-product-management`
2. Click "Add Product" or edit an existing product
3. In the "Product Images" section:
   - **Option 1**: Click "Upload Image" to upload from your device
   - **Option 2**: Enter an image URL manually
4. Images are automatically added to the product
5. The first image is marked as "Primary"

### Using the Upload Component Elsewhere
```tsx
import CloudinaryImageUpload from '@/components/common/CloudinaryImageUpload';

function MyComponent() {
  const handleImageUploaded = (url: string) => {
    console.log('Image uploaded:', url);
    // Do something with the URL
  };

  return (
    <CloudinaryImageUpload onImageUploaded={handleImageUploaded} />
  );
}
```

## Cloudinary Dashboard
- **Cloud Name**: dhucxjkgt
- **Folder**: trendyluxebag/products
- **URL**: https://cloudinary.com/console

## Image Organization
All product images are stored in the `trendyluxebag/products` folder in Cloudinary for easy management and organization.

## Display Images
To display Cloudinary images with optimization, use the `CldImage` component:

```tsx
import { CldImage } from 'next-cloudinary';

<CldImage
  src="trendyluxebag/products/image-id"
  width={500}
  height={500}
  crop={{
    type: 'auto',
    source: true
  }}
  alt="Product image"
/>
```

The `CldImage` component automatically applies:
- Auto-format (serves WebP/AVIF when supported)
- Auto-quality (optimizes file size)
- Responsive sizing
- Lazy loading

## Security Notes
- API Secret is stored server-side only (not exposed to client)
- Upload endpoint includes file validation
- Only image files are accepted
- Maximum file size is 5MB
