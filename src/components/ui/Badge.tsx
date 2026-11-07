import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'whatsapp';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-brand-900 text-white',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    neutral: 'bg-gray-100 text-gray-700',
    whatsapp: 'bg-emerald-500 text-white font-medium',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
  }[size];

  return (
    <span className={`inline-flex items-center gap-1 leading-none ${variantStyles} ${sizeStyles} ${className}`}>
      {children}
    </span>
  );
}

