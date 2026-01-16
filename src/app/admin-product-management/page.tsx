import type { Metadata } from 'next';
import AdminNavigation from '@/components/common/AdminNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';
import ProductManagementInteractive from './components/ProductManagementInteractive';

export const metadata: Metadata = {
  title: 'Product Management - TrendyLuxeBag Admin',
  description:
    'Manage your luxury bag inventory with comprehensive product administration tools including add, edit, delete operations and advanced image handling capabilities.',
};

export default function AdminProductManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />

      <main className="ml-72 min-h-screen">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-8 pb-24 lg:pb-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-semibold text-foreground mb-3">
              Product Management
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Manage your luxury bag inventory with comprehensive administration
              tools
            </p>
          </div>

          {/* Interactive Content */}
          <ProductManagementInteractive />
        </div>
      </main>

      <MobileNavigation />
    </div>
  );
}