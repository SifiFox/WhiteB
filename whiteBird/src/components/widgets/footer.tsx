import { Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Globe className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">WhiteB</span>
          </div>

          <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} WhiteB. Создано с ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};
