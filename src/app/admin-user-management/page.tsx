'use client';

import AdminRoute from '@/components/auth/AdminRoute';
import AdminNavigation from '@/components/common/AdminNavigation';
import UserManagementInteractive from './components/UserManagementInteractive';

export default function AdminUserManagementPage() {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-background">
        {/* Admin Sidebar Navigation */}
        <AdminNavigation />

        {/* Main Content */}
        <div className="ml-20 lg:ml-72 transition-all duration-300">
          <UserManagementInteractive />
        </div>
      </div>
    </AdminRoute>
  );
}