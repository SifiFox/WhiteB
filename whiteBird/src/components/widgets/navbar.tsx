import { memo } from 'react';
import { Link } from '@tanstack/react-router';

interface NavbarProps {
  navLinks: { title: string; url: string }[];
}

const Navbar = memo(({
  navLinks,
}: NavbarProps) => {
  return (
    <div className="flex items-center space-x-8">
      {navLinks.map((item) => (
        <Link
          key={item.title}
          to={item.url}
          className="data-[status='active']:font-bold data-[status='active']:text-black text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          activeProps={{
            className: 'text-sm text-foreground hover:text-foreground transition-colors font-bold pointer-events-none cursor-default',
          }}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
});

Navbar.displayName = 'Navbar';

export { Navbar };
