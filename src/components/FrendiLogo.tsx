
import React from 'react';
import { cn } from '@/lib/utils';

export function FrendiLogo({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={cn(
              'rounded-sm bg-primary', 
              size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
            )} 
          />
        ))}
      </div>
      <span className={cn('font-bold tracking-wider text-primary', sizes[size])}>
        FRENDi
      </span>
    </div>
  );
}
