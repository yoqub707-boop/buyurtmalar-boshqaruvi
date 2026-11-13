import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-[#70452F] flex-shrink-0" />,
  };

  const borderClasses = {
    success: 'border-emerald-200 bg-white shadow-emerald-950/10',
    error: 'border-rose-200 bg-white shadow-rose-950/10',
    info: 'border-[#EEE8E1] bg-white shadow-[#70452F]/10',
  };

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg animate-fade-in transition-all',
        borderClasses[toast.type]
      )}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {icons[toast.type]}
        <p className="text-sm font-medium text-[#29231F] leading-snug">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-[#8D8178] hover:text-[#29231F] transition-colors p-1 rounded-lg hover:bg-[#FAF8F5]"
        aria-label="Yopish"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
