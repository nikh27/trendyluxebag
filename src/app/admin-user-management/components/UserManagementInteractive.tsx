'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import UserTableRow from './UserTableRow';
import UserMobileCard from './UserMobileCard';
import UserStatsCard from './UserStatsCard';
import ConfirmationModal from './ConfirmationModal';
import { getAllUsers, updateUserRole, updateUserStatus, type User } from '@/services/userService';

interface UserWithStatus extends User {
  status: 'active' | 'inactive' | 'suspended';
  registeredDate: string;
  avatarAlt: string;
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
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [users, setUsers] = useState<UserWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setIsHydrated(true);
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await getAllUsers();
      // Map to include status and formatted date
      const mappedUsers: UserWithStatus[] = fetchedUsers.map(user => ({
        ...user,
        status: 'active' as const, // All users are active by default
        registeredDate: new Date(user.createdAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        avatarAlt: `${user.name || user.fullName || 'User'} avatar`,
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate real stats from user data
  const userStats: UserStats = {
    totalUsers: users.length.toString(),
    totalChange: '+0%',
    totalTrend: 'up',
    activeUsers: users.filter(u => u.status === 'active').length.toString(),
    activeChange: '+0%',
    activeTrend: 'up',
    adminUsers: users.filter(u => u.role === 'admin').length.toString(),
    adminChange: '+0',
    adminTrend: 'up',
    newThisMonth: users.filter(u => {
      const userDate = new Date(u.createdAt);
      const now = new Date();
      return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
    }).length.toString(),
    newChange: '+0%',
    newTrend: 'up'
  };

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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'name') {
      comparison = (a.name || '').localeCompare(b.name || '');
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
    router.push(`/admin-user-profile?id=${userId}`);
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction.type === 'promote' && confirmAction.userId && confirmAction.newRole) {
        // Update role in Firestore
        await updateUserRole(confirmAction.userId, confirmAction.newRole);

        // Update local state
        setUsers(prev => prev.map(user =>
          user.id === confirmAction.userId
            ? { ...user, role: confirmAction.newRole! }
            : user
        ));
      } else if (confirmAction.type === 'status' && confirmAction.userId && confirmAction.newStatus) {
        // Update status in Firestore
        await updateUserStatus(confirmAction.userId, confirmAction.newStatus);

        // Update local state
        setUsers(prev => prev.map(user =>
          user.id === confirmAction.userId
            ? { ...user, status: confirmAction.newStatus! }
            : user
        ));
      }

      setShowConfirmModal(false);
      setConfirmAction(null);
    } catch (error) {
      console.error('Error executing action:', error);
      alert('Failed to update user. Please try again.');
      setShowConfirmModal(false);
      setConfirmAction(null);
    }
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
        message: `Are you sure you want to change this user's role to ${confirmAction.newRole}? This will ${confirmAction.newRole === 'admin' ? 'grant' : 'revoke'} administrative privileges.`,

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
                Showing {sortedUsers.length} of {users.length} users
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