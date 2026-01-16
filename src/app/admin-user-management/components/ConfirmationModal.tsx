'use client';

import Icon from '@/components/ui/AppIcon';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'info' | 'warning' | 'danger';
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = 'info',
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const getIconColor = () => {
    switch (type) {
      case 'warning':
        return 'text-warning';
      case 'danger':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const getIconName = () => {
    switch (type) {
      case 'warning':
        return 'ExclamationTriangleIcon';
      case 'danger':
        return 'ExclamationCircleIcon';
      default:
        return 'InformationCircleIcon';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-luxury shadow-luxury-lg max-w-md w-full p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 ${getIconColor()}`}>
            <Icon name={getIconName() as any} size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              {title}
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-11 px-6 bg-muted text-foreground rounded-luxury font-body text-sm font-medium transition-luxury hover:bg-muted/80 active:scale-[0.97]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 h-11 px-6 rounded-luxury font-body text-sm font-medium transition-luxury active:scale-[0.97] ${
              type === 'danger' ?'bg-error text-error-foreground hover:shadow-luxury' :'bg-primary text-primary-foreground hover:shadow-luxury'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;