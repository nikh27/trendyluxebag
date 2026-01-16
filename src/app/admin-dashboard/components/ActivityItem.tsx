interface ActivityItemProps {
  type: 'product' | 'user' | 'system';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

const ActivityItem = ({ type, title, description, timestamp, icon }: ActivityItemProps) => {
  const typeColors = {
    product: 'bg-primary/10 text-primary',
    user: 'bg-accent/10 text-accent',
    system: 'bg-secondary/10 text-secondary'
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-luxury transition-luxury hover:bg-muted">
      <div className={`w-10 h-10 rounded-luxury flex items-center justify-center flex-shrink-0 ${typeColors[type]}`}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon === 'ShoppingBagIcon' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          )}
          {icon === 'UserPlusIcon' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          )}
          {icon === 'BellIcon' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          )}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-body text-sm font-medium text-foreground mb-1">{title}</h4>
        <p className="caption text-muted-foreground mb-2">{description}</p>
        <span className="caption text-muted-foreground">{timestamp}</span>
      </div>
    </div>
  );
};

export default ActivityItem;