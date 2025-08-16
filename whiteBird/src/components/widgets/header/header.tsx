import { memo } from 'react';
import { Logo } from '@/components/ui/logo';
import { Navbar } from '@/components/widgets/navbar';
import { AuthButtons } from './auth-buttons';
import { MobileMenu } from './mobile-menu';
import { MENU_ITEMS } from '@/lib/configs/navbar-config';

export const Header = memo(() => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4 md:px-0">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden md:flex items-center">
          <Navbar navLinks={MENU_ITEMS} />
        </div>

        <div className="hidden md:flex items-center">
          <AuthButtons />
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
});

Header.displayName = 'Header';

