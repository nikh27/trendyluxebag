import Link from 'next/link';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const QuickActionCard = ({ 
  title, 
  description, 
  icon, 
  href,
  variant = 'primary' 
}: QuickActionCardProps) => {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:shadow-luxury',
    secondary: 'bg-secondary text-secondary-foreground hover:shadow-luxury',
    accent: 'bg-accent text-accent-foreground hover:shadow-luxury'
  };

  return (
    <Link
      href={href}
      className={`block rounded-luxury p-6 transition-luxury ${variantStyles[variant]} active:scale-[0.97]`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-luxury bg-white/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon === 'PlusCircleIcon' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
            {icon === 'UsersIcon' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            )}
            {icon === 'DocumentTextIcon' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            )}
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-body text-lg font-semibold mb-1">{title}</h3>
          <p className="caption opacity-90">{description}</p>
        </div>
        <svg className="w-5 h-5 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

export default QuickActionCard;