'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarAlt: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  registeredDate: string;
}

interface UserTableRowProps {
  user: User;
  onPromote: (userId: string, newRole: 'user' | 'admin') => void;
  onStatusChange: (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => void;
  onViewProfile: (userId: string) => void;
}

const UserTableRow = ({ user, onPromote, onStatusChange, onViewProfile }: UserTableRowProps) => {
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
    <tr className="border-b border-border transition-luxury hover:bg-muted/50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <AppImage
              src={user.avatar}
              alt={user.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-body text-sm font-medium text-foreground truncate">
              {user.name}
            </div>
            <div className="caption text-xs text-muted-foreground truncate">
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="data-text text-sm text-foreground">
          {user.registeredDate}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="relative inline-block">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-luxury caption text-xs font-medium transition-luxury ${getRoleBadgeColor(user.role)}`}
          >
            <span className="capitalize">{user.role}</span>
            <Icon name="ChevronDownIcon" size={14} />
          </button>
          {showRoleMenu && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-card border border-border rounded-luxury shadow-luxury-lg z-10">
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
      </td>
      <td className="px-6 py-4">
        <div className="relative inline-block">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-luxury caption text-xs font-medium transition-luxury ${getStatusColor(user.status)}`}
          >
            <span className="capitalize">{user.status}</span>
            <Icon name="ChevronDownIcon" size={14} />
          </button>
          {showStatusMenu && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-card border border-border rounded-luxury shadow-luxury-lg z-10">
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
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewProfile(user.id)}
            className="p-2 rounded-luxury transition-luxury hover:bg-muted"
            aria-label="View profile"
          >
            <Icon name="EyeIcon" size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;