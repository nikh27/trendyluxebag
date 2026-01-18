'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  avatarAlt: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  registeredDate: string;
}

interface UserMobileCardProps {
  user: User;
  onPromote: (userId: string, newRole: 'user' | 'admin') => void;
  onStatusChange: (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => void;
  onViewProfile: (userId: string) => void;
}

const UserMobileCard = ({ user, onPromote, onStatusChange, onViewProfile }: UserMobileCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'suspended':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary';
  };

  return (
    <div className="bg-card rounded-luxury p-4 shadow-luxury-sm">
      <div className="flex items-start gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={user.avatar || '/images/default-avatar.png'}
            alt={user.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-body text-base font-medium text-foreground truncate">
            {user.name || 'Unknown User'}
          </div>
          <div className="caption text-sm text-muted-foreground truncate">
            {user.email}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-flex px-2 py-1 rounded-luxury caption text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
              {user.role}
            </span>
            <span className={`inline-flex px-2 py-1 rounded-luxury caption text-xs font-medium ${getStatusColor(user.status)}`}>
              {user.status}
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-luxury transition-luxury hover:bg-muted flex-shrink-0"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          <Icon name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={20} />
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <div>
            <div className="caption text-xs text-muted-foreground mb-1">Registered Date</div>
            <div className="data-text text-sm text-foreground">{user.registeredDate}</div>
          </div>

          <div>
            <div className="caption text-xs text-muted-foreground mb-2">Change Role</div>
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="w-full h-10 px-4 bg-input border border-border rounded-luxury font-body text-sm text-left flex items-center justify-between transition-luxury hover:bg-muted"
              >
                <span className="capitalize">{user.role}</span>
                <Icon name="ChevronDownIcon" size={16} />
              </button>
              {showRoleMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-luxury shadow-luxury-lg z-10">
                  <button
                    onClick={() => {
                      onPromote(user.id, 'user');
                      setShowRoleMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left font-body text-sm transition-luxury hover:bg-muted first:rounded-t-luxury"
                  >
                    User
                  </button>
                  <button
                    onClick={() => {
                      onPromote(user.id, 'admin');
                      setShowRoleMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left font-body text-sm transition-luxury hover:bg-muted last:rounded-b-luxury"
                  >
                    Admin
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="caption text-xs text-muted-foreground mb-2">Change Status</div>
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="w-full h-10 px-4 bg-input border border-border rounded-luxury font-body text-sm text-left flex items-center justify-between transition-luxury hover:bg-muted"
              >
                <span className="capitalize">{user.status}</span>
                <Icon name="ChevronDownIcon" size={16} />
              </button>
              {showStatusMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-luxury shadow-luxury-lg z-10">
                  <button
                    onClick={() => {
                      onStatusChange(user.id, 'active');
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left font-body text-sm transition-luxury hover:bg-muted first:rounded-t-luxury"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => {
                      onStatusChange(user.id, 'inactive');
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left font-body text-sm transition-luxury hover:bg-muted"
                  >
                    Inactive
                  </button>
                  <button
                    onClick={() => {
                      onStatusChange(user.id, 'suspended');
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-4 py-2.5 text-left font-body text-sm transition-luxury hover:bg-muted last:rounded-b-luxury"
                  >
                    Suspended
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => onViewProfile(user.id)}
            className="w-full h-10 px-4 bg-primary text-primary-foreground rounded-luxury font-body text-sm font-medium transition-luxury hover:shadow-luxury active:scale-[0.97] flex items-center justify-center gap-2"
          >
            <Icon name="EyeIcon" size={18} />
            <span>View Profile</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMobileCard;