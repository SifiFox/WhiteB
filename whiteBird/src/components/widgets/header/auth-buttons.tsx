import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { AUTH_CONFIG } from '@/lib/configs/navbar-config';

export const AuthButtons = () => (
  <div className="flex items-center space-x-4">
    <Button asChild variant="ghost" size="sm">
      <Link to={AUTH_CONFIG.login.url}>{AUTH_CONFIG.login.title}</Link>
    </Button>
    <Button asChild size="sm">
      <Link to={AUTH_CONFIG.signup.url}>{AUTH_CONFIG.signup.title}</Link>
    </Button>
  </div>
);
