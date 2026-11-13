import React from 'react';
import { OrderStatus } from '../types/order';
import { CheckCircle2, Clock3 } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', className }) => {
  const isReady = status === 'Tayyor';

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs md:text-sm px-3 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border transition-all duration-200 select-none shadow-sm',
        sizeClasses[size],
        isReady
          ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80 shadow-emerald-500/10'
          : 'bg-amber-50 text-amber-800 border-amber-200/80 shadow-amber-500/10',
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full animate-pulse',
          isReady ? 'bg-emerald-500' : 'bg-amber-500'
        )}
      />
      {isReady ? (
        <CheckCircle2 className={cn(size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5', 'text-emerald-600')} />
      ) : (
        <Clock3 className={cn(size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5', 'text-amber-600')} />
      )}
      <span>{status}</span>
    </span>
  );
};
