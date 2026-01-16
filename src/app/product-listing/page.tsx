import type { Metadata } from 'next';
import CustomerNavigation from '@/components/common/CustomerNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';
import ProductListingInteractive from './components/ProductListingInteractive';

export const metadata: Metadata = {
    title: 'Luxury Bags Collection - TrendyLuxeBag',
    description:
        'Browse our curated collection of premium luxury bags for modern women. Shop tote bags, clutches, shoulder bags, crossbody bags, and backpacks with advanced filtering and sorting options.',
};

export default function ProductListingPage() {
    return (
        <div className="min-h-screen bg-background">
            <CustomerNavigation />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 pb-24 lg:pb-8">
                <ProductListingInteractive />
            </main>
            <MobileNavigation showCartBadge cartItemCount={3} />
        </div>
    );
}