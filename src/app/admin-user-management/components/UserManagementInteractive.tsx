'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import UserTableRow from './UserTableRow';
import UserMobileCard from './UserMobileCard';
import UserStatsCard from './UserStatsCard';
import ConfirmationModal from './ConfirmationModal';

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

interface UserStats {
  totalUsers: string;
  totalChange: string;
  totalTrend: 'up' | 'down';
  activeUsers: string;
  activeChange: string;
  activeTrend: 'up' | 'down';
  adminUsers: string;
  adminChange: string;
  adminTrend: 'up' | 'down';
  newThisMonth: string;
  newChange: string;
  newTrend: 'up' | 'down';
}

const UserManagementInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'role'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'promote' | 'status' | 'bulk';
    userId?: string;
    newRole?: 'user' | 'admin';
    newStatus?: 'active' | 'inactive' | 'suspended';
  } | null>(null);

  const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
    avatarAlt: 'Professional woman with long brown hair in white blouse smiling at camera',
    role: 'admin',
    status: 'active',
    registeredDate: '01/15/2026'
  },
  {
    id: '2',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1124a4601-1763295240952.png",
    avatarAlt: 'Asian woman with black hair in professional attire with confident expression',
    role: 'user',
    status: 'active',
    registeredDate: '01/14/2026'
  },
  {
    id: '3',
    name: 'Jessica Martinez',
    email: 'jessica.martinez@example.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1623c0903-1763296489854.png",
    avatarAlt: 'Hispanic woman with curly hair in casual outfit smiling warmly',
    role: 'user',
    status: 'active',
    registeredDate: '01/13/2026'
  },
  {
    id: '4',
    name: 'Amanda Williams',
    email: 'amanda.williams@example.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18f15b753-1763301304170.png",
    avatarAlt: 'Blonde woman in business casual attire with friendly smile',
    role: 'user',
    status: 'inactive',
    registeredDate: '01/10/2026'
  },
  {
    id: '5',
    name: 'Rachel Thompson',
    email: 'rachel.thompson@example.com',
    avatar: "https://images.unsplash.com/photo-1601514001887-0e9bc13d80b8",
    avatarAlt: 'Woman with red hair in elegant dress with sophisticated look',
    role: 'admin',
    status: 'active',
    registeredDate: '01/08/2026'
  },
  {
    id: '6',
    name: 'Olivia Davis',
    email: 'olivia.davis@example.com',
    avatar: "https://images.unsplash.com/photo-1711688590067-538b332dba7e",
    avatarAlt: 'Young woman with dark hair in modern outfit with bright smile',
    role: 'user',
    status: 'suspended',
    registeredDate: '01/05/2026'
  },
  {
    id: '7',
    name: 'Sophia Anderson',
    email: 'sophia.anderson@example.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_179161fd9-1763298723409.png",
    avatarAlt: 'Professional woman with glasses in business attire looking confident',
    role: 'user',
    status: 'active',
    registeredDate: '01/03/2026'
  },
  {
    id: '8',
    name: 'Isabella Garcia',
    email: 'isabella.garcia@example.com',
    avatar: "https://images.unsplash.com/photo-1690622006386-5970822da733",
    avatarAlt: 'Woman with long dark hair in casual style with natural smile',
    role: 'user',
    status: 'active',
    registeredDate: '12/28/2025'
  }];


  const userStats: UserStats = {
    totalUsers: '2,847',
    totalChange: '+12.5%',
    totalTrend: 'up',
    activeUsers: '2,654',
    activeChange: '+8.3%',
    activeTrend: 'up',
    adminUsers: '24',
    adminChange: '+2',
    adminTrend: 'up',
    newThisMonth: '186',
    newChange: '+15.2%',
    newTrend: 'up'
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex-1 p-6 lg:p-8 space-y-6">
        <div className="h-8 bg-muted rounded-luxury animate-pulse w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) =>
          <div key={i} className="h-32 bg-muted rounded-luxury animate-pulse" />
          )}
        </div>
        <div className="h-96 bg-muted rounded-luxury animate-pulse" />
      </div>);

  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      comparison = new Date(a.registeredDate).getTime() - new Date(b.registeredDate).getTime();
    } else if (sortBy === 'role') {
      comparison = a.role.localeCompare(b.role);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handlePromote = (userId: string, newRole: 'user' | 'admin') => {
    setConfirmAction({ type: 'promote', userId, newRole });
    setShowConfirmModal(true);
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setConfirmAction({ type: 'status', userId, newStatus });
    setShowConfirmModal(true);
  };

  const handleViewProfile = (userId: string) => {
    console.log('View profile:', userId);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      console.log('Confirmed action:', confirmAction);
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
    prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === sortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(sortedUsers.map((user) => user.id));
    }
  };

  const getConfirmModalContent = () => {
    if (!confirmAction) return { title: '', message: '', confirmText: '', type: 'info' as const };

    if (confirmAction.type === 'promote') {
      return {
        title: 'Change User Role',
        message: `Are you sure you want to change this user's role to ${confirmAction.newRole}? This will ${
        confirmAction.newRole === 'admin' ? 'grant' : 'revoke'} administrative privileges.`,

        confirmText: 'Change Role',
        type: 'warning' as const
      };
    }

    if (confirmAction.type === 'status') {
      return {
        title: 'Change User Status',
        message: `Are you sure you want to change this user's status to ${confirmAction.newStatus}?`,
        confirmText: 'Change Status',
        type: confirmAction.newStatus === 'suspended' ? 'danger' as const : 'info' as const
      };
    }

    return { title: '', message: '', confirmText: '', type: 'info' as const };
  };

  const modalContent = getConfirmModalContent();

  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-luxury">
        <div className="p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              User Management
            </h1>
            <p className="font-body text-base text-muted-foreground">
              Manage user accounts, roles, and permissions
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UserStatsCard
              title="Total Users"
              value={userStats.totalUsers}
              change={userStats.totalChange}
              trend={userStats.totalTrend}
              icon="UsersIcon" />

            <UserStatsCard
              title="Active Users"
              value={userStats.activeUsers}
              change={userStats.activeChange}
              trend={userStats.activeTrend}
              icon="CheckCircleIcon" />

            <UserStatsCard
              title="Admin Users"
              value={userStats.adminUsers}
              change={userStats.adminChange}
              trend={userStats.adminTrend}
              icon="ShieldCheckIcon" />

            <UserStatsCard
              title="New This Month"
              value={userStats.newThisMonth}
              change={userStats.newChange}
              trend={userStats.newTrend}
              icon="UserPlusIcon" />

          </div>

          {/* Filters & Search */}
          <div className="bg-card rounded-luxury p-6 shadow-luxury-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Icon
                    name="MagnifyingGlassIcon"
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full h-12 pl-12 pr-4 bg-input border border-border rounded-luxury font-body text-sm transition-luxury focus:outline-none focus:ring-2 focus:ring-ring" />

                </div>
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="h-12 px-4 bg-input border border-border rounded-luxury font-body text-sm transition-luxury focus:outline-none focus:ring-2 focus:ring-ring">

                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="h-12 px-4 bg-input border border-border rounded-luxury font-body text-sm transition-luxury focus:outline-none focus:ring-2 focus:ring-ring">

                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  setSortBy(newSortBy as any);
                  setSortOrder(newSortOrder as any);
                }}
                className="h-12 px-4 bg-input border border-border rounded-luxury font-body text-sm transition-luxury focus:outline-none focus:ring-2 focus:ring-ring">

                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="role-asc">Role A-Z</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <div className="caption text-sm text-muted-foreground">
                Showing {sortedUsers.length} of {mockUsers.length} users
              </div>
              {selectedUsers.length > 0 &&
              <div className="caption text-sm text-primary font-medium">
                  {selectedUsers.length} selected
                </div>
              }
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-card rounded-luxury shadow-luxury-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === sortedUsers.length}
                          onChange={handleSelectAll}
                          className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring transition-luxury" />

                        <span className="caption text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          User
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left caption text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-4 text-left caption text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left caption text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left caption text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) =>
                  <UserTableRow
                    key={user.id}
                    user={user}
                    onPromote={handlePromote}
                    onStatusChange={handleStatusChange}
                    onViewProfile={handleViewProfile} />

                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {sortedUsers.map((user) =>
            <UserMobileCard
              key={user.id}
              user={user}
              onPromote={handlePromote}
              onStatusChange={handleStatusChange}
              onViewProfile={handleViewProfile} />

            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        title={modalContent.title}
        message={modalContent.message}
        confirmText={modalContent.confirmText}
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        type={modalContent.type} />

    </>);

};

export default UserManagementInteractive;