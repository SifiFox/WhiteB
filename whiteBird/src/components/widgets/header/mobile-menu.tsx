import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle,  SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { LOGO_CONFIG, MENU_ITEMS } from '@/lib/configs/navbar-config';
import { Link } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { AUTH_CONFIG } from '@/lib/configs/navbar-config';

export const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <Menu className="size-4" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>
          <Link to={LOGO_CONFIG.url} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {LOGO_CONFIG.title.charAt(0)}
              </span>
            </div>
            <span className="font-bold text-xl">{LOGO_CONFIG.title}</span>
          </Link>
        </SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col space-y-4">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeProps={{
                className: 'text-lg text-foreground hover:text-foreground transition-colors font-bold pointer-events-none cursor-default',
              }}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-4 border-t">
          <Button asChild variant="outline">
            <Link to={AUTH_CONFIG.login.url}>{AUTH_CONFIG.login.title}</Link>
          </Button>
          <Button asChild>
            <Link to={AUTH_CONFIG.signup.url}>{AUTH_CONFIG.signup.title}</Link>
          </Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);
