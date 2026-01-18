'use client';

import AdminRoute from '@/components/auth/AdminRoute';
import AdminNavigation from '@/components/common/AdminNavigation';
import DashboardInteractive from './components/DashboardInteractive';

export default function AdminDashboardPage() {
    return (
        <AdminRoute>
            <div className="min-h-screen bg-background">
                <AdminNavigation />
                <main className="ml-20 lg:ml-72 min-h-screen p-6 lg:p-8 transition-all duration-300">
                    <DashboardInteractive />
                </main>
            </div>
        </AdminRoute>
    );
}