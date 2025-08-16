import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button/button';
import { DialogSignIn } from '@/components/ui/dialogs/dialog-sign-in';
import { DialogSignUp } from '@/components/ui/dialogs/dialog-sign-up';
import { useIsAuthenticated, useLogout, useCurrentUser } from '@/lib/hooks/use-auth';

export const AuthButtons = memo(() => {
  const isAuth = useIsAuthenticated();
  const logout = useLogout();
  const { data: user } = useCurrentUser();

  const handleLogout = () => {
    logout.mutate();
  };

  if (isAuth) {
    return (
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/profile">
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{user.name}</span>
                {user.isAdmin && (
                  <span className="px-1.5 py-0.5 bg-primary text-primary-foreground rounded text-xs">
              Админ
                  </span>
                )}
              </div>
            )}
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          disabled={logout.isPending}
        >
          {logout.isPending ? 'Выход...' : 'Выйти'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <DialogSignIn />
      <DialogSignUp />
    </div>
  );
});

AuthButtons.displayName = 'AuthButtons';
