import type { Metadata } from 'next';
import AdminNavigation from '@/components/common/AdminNavigation';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
    title: 'Admin Dashboard - TrendyLuxeBag',
    description: 'Comprehensive product and user management dashboard for TrendyLuxeBag luxury fashion e-commerce platform with real-time metrics and analytics.',
};

export default function AdminDashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <AdminNavigation />
            <main className="ml-20 lg:ml-72 min-h-screen p-6 lg:p-8 transition-all duration-300">
                <DashboardInteractive />
            </main>
        </div>
    );
}