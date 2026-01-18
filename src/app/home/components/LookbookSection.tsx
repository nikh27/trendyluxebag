'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface LookbookSectionProps {
    onPlayVideo: () => void;
}

const LookbookSection = ({ onPlayVideo }: LookbookSectionProps) => {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')]" />
            </div>

            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 backdrop-blur-sm rounded-full border border-accent/20">
                            <Icon name="SparklesIcon" size={18} className="text-accent" />
                            <span className="text-sm font-semibold text-accent">
                                Lookbook 2026
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                            Discover Our
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                                Latest Collection
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-xl">
                            Explore the newest trends in luxury bags. Watch our exclusive lookbook video featuring the most coveted styles of the season.
                        </p>

                        {/* CTA Button */}
                        <button
                            onClick={onPlayVideo}
                            className="group flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all">
                                <Icon name="PlayIcon" size={24} className="fill-current ml-0.5" />
                            </div>
                            <span>Watch Lookbook</span>
                        </button>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-4">
                            <div>
                                <p className="font-heading text-3xl font-bold text-foreground">50+</p>
                                <p className="text-sm text-muted-foreground">New Styles</p>
                            </div>
                            <div className="w-px h-12 bg-border" />
                            <div>
                                <p className="font-heading text-3xl font-bold text-foreground">100%</p>
                                <p className="text-sm text-muted-foreground">Premium Quality</p>
                            </div>
                            <div className="w-px h-12 bg-border" />
                            <div>
                                <p className="font-heading text-3xl font-bold text-foreground">2026</p>
                                <p className="text-sm text-muted-foreground">Collection</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Video Thumbnail */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" onClick={onPlayVideo}>
                            {/* Thumbnail Image */}
                            <AppImage
                                src="https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
                                alt="Lookbook 2026 Preview"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:bg-white transition-all"
                                >
                                    <Icon name="PlayIcon" size={32} className="fill-primary ml-1" />
                                </motion.div>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg">
                                <p className="text-white text-sm font-medium">0:05</p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-white text-xs font-medium">NEW</span>
                            </div>
                        </div>

                        {/* Floating Cards */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-xl opacity-20 blur-xl"
                        />
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-accent to-primary rounded-2xl shadow-xl opacity-20 blur-xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LookbookSection;
