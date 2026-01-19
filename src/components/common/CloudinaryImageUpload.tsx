'use client';

import { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface CloudinaryImageUploadProps {
    onImageUploaded: (url: string) => void;
    className?: string;
}

const CloudinaryImageUpload = ({ onImageUploaded, className = '' }: CloudinaryImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setError(null);
        setUploading(true);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        try {
            // Upload to Cloudinary via API route
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();

            if (data.success && data.url) {
                onImageUploaded(data.url);
                // Reset preview after successful upload
                setTimeout(() => setPreview(null), 1500);
            } else {
                throw new Error('Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload image. Please try again.');
            setPreview(null);
        } finally {
            setUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={className}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            <button
                type="button"
                onClick={handleClick}
                disabled={uploading}
                className="flex items-center gap-2 h-12 px-6 bg-accent text-accent-foreground rounded-luxury font-body text-base font-medium transition-spring hover:shadow-luxury active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {uploading ? (
                    <>
                        <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                        <span>Uploading...</span>
                    </>
                ) : (
                    <>
                        <Icon name="CloudArrowUpIcon" size={20} />
                        <span>Upload Image</span>
                    </>
                )}
            </button>

            {preview && (
                <div className="mt-4 relative w-32 h-32 rounded-luxury overflow-hidden border-2 border-accent">
                    <AppImage
                        src={preview}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                    />
                    {uploading && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                            <Icon name="ArrowPathIcon" size={32} className="animate-spin text-accent" />
                        </div>
                    )}
                    {!uploading && (
                        <div className="absolute inset-0 bg-success/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon name="CheckCircleIcon" size={32} className="text-success" />
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p className="caption text-error mt-2">{error}</p>
            )}

            <p className="caption text-muted-foreground mt-2">
                Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
            </p>
        </div>
    );
};

export default CloudinaryImageUpload;
