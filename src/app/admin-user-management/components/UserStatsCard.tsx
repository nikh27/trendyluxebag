import Icon from '@/components/ui/AppIcon';

interface UserStatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

const UserStatsCard = ({ title, value, change, trend, icon }: UserStatsCardProps) => {
  return (
    <div className="bg-card rounded-luxury p-6 shadow-luxury-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="caption text-sm text-muted-foreground mb-1">{title}</div>
          <div className="font-heading text-3xl font-semibold text-foreground mb-2">
            {value}
          </div>
          <div className={`flex items-center gap-1 caption text-xs font-medium ${
            trend === 'up' ? 'text-success' : 'text-error'
          }`}>
            <Icon name={trend === 'up' ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={14} />
            <span>{change}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-luxury bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;