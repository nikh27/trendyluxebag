'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BulkActionsDropdownProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: 'active' | 'draft' | 'archived') => void;
  onClearSelection: () => void;
}

const BulkActionsDropdown = ({
  selectedCount,
  onBulkDelete,
  onBulkStatusChange,
  onClearSelection,
}: BulkActionsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (selectedCount === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-12 px-6 bg-primary text-primary-foreground rounded-luxury font-body text-base font-medium transition-luxury hover:shadow-luxury"
      >
        <span>Bulk Actions ({selectedCount})</span>
        <Icon name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={20} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 w-64 bg-card border border-border rounded-luxury shadow-luxury-lg z-20 overflow-hidden">
            <div className="p-2 space-y-1">
              <button
                onClick={() => {
                  onBulkStatusChange('active');
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-luxury transition-luxury hover:bg-muted text-left"
              >
                <Icon name="CheckCircleIcon" size={18} />
                <span className="font-body text-sm">Set as Active</span>
              </button>
              <button
                onClick={() => {
                  onBulkStatusChange('draft');
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-luxury transition-luxury hover:bg-muted text-left"
              >
                <Icon name="DocumentTextIcon" size={18} />
                <span className="font-body text-sm">Set as Draft</span>
              </button>
              <button
                onClick={() => {
                  onBulkStatusChange('archived');
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-luxury transition-luxury hover:bg-muted text-left"
              >
                <Icon name="ArchiveBoxIcon" size={18} />
                <span className="font-body text-sm">Archive</span>
              </button>
              <div className="h-px bg-border my-1" />
              <button
                onClick={() => {
                  onBulkDelete();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-luxury transition-luxury hover:bg-error/10 text-error text-left"
              >
                <Icon name="TrashIcon" size={18} />
                <span className="font-body text-sm">Delete Selected</span>
              </button>
              <button
                onClick={() => {
                  onClearSelection();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-luxury transition-luxury hover:bg-muted text-left"
              >
                <Icon name="XMarkIcon" size={18} />
                <span className="font-body text-sm">Clear Selection</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BulkActionsDropdown;