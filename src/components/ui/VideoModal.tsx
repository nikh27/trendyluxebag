'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Icon from './AppIcon';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    title?: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl, title = 'Lookbook' }: VideoModalProps) => {
    const [isLoading, setIsLoading] = useState(true);

    // Determine if it's a YouTube video or local video
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            setIsLoading(true); // Reset loading state when modal opens
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Extract video ID from YouTube URL
    const getYouTubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&?]*).*/;
        const match = url.match(regExp);
        const videoId = match && match[2].length === 11 ? match[2] : null;
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute -top-12 right-0 md:top-4 md:right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors z-10"
                            aria-label="Close video"
                        >
                            <Icon name="XMarkIcon" size={24} />
                        </motion.button>

                        {/* Title */}
                        {title && (
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg z-10"
                            >
                                <h3 className="text-white font-heading text-lg font-semibold">{title}</h3>
                            </motion.div>
                        )}

                        {/* Loading Spinner */}
                        {isLoading && isYouTube && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                    <p className="text-white/60 text-sm">Loading video...</p>
                                </div>
                            </div>
                        )}

                        {/* Video Player */}
                        {isYouTube ? (
                            // YouTube iframe
                            <iframe
                                key={isOpen ? 'open' : 'closed'}
                                src={isOpen ? getYouTubeEmbedUrl(videoUrl) : ''}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => setIsLoading(false)}
                            />
                        ) : (
                            // Local video player
                            <video
                                key={isOpen ? 'open' : 'closed'}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                loop
                                playsInline
                                onLoadedData={() => setIsLoading(false)}
                            >
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </motion.div>

                    {/* Instructions */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-8 text-white/60 text-sm"
                    >
                        Press ESC or click outside to close
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;

