import type { Metadata } from 'next';
import AdminNavigation from '@/components/common/AdminNavigation';
import UserManagementInteractive from './components/UserManagementInteractive';

export const metadata: Metadata = {
  title: 'User Management - TrendyLuxeBag Admin',
  description: 'Manage user accounts, roles, and permissions for TrendyLuxeBag platform with comprehensive administrative controls and user oversight.',
};

export default function AdminUserManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar Navigation */}
      <AdminNavigation />

      {/* Main Content */}
      <div className="ml-20 lg:ml-72 transition-all duration-300">
        <UserManagementInteractive />
      </div>
    </div>
  );
}