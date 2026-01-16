import FavoritesInteractive from './components/FavoritesInteractive';
import CustomerNavigation from '@/components/common/CustomerNavigation';
import MobileNavigation from '@/components/common/MobileNavigation';

export const metadata = {
  title: 'My Favorites - TrendyLuxeBag',
  description: 'View your favorite luxury bags and handbags',
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <FavoritesInteractive />
      </div>
      <MobileNavigation />
    </div>
  );
}