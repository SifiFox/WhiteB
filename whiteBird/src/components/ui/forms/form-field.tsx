import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ id, label, error, children, className = 'space-y-2' }: FormFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
