import { Link } from '@tanstack/react-router';
import { LOGO_CONFIG } from '@/lib/configs/navbar-config';
import { memo } from 'react';

export const Logo = memo(() => (
  <Link to={LOGO_CONFIG.url} className="flex items-center space-x-2">
    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
      <span className="text-primary-foreground font-bold text-lg">
        {LOGO_CONFIG.title.charAt(0)}
      </span>
    </div>
    <span className="font-bold text-xl">{LOGO_CONFIG.title}</span>
  </Link>
), () => true);

Logo.displayName = 'Logo';
