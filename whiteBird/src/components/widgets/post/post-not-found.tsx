import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileX } from 'lucide-react';

export function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-6">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <FileX className="h-16 w-16 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Пост не найден, либо произошла ошибка при получении поста
          </h1>
          <p className="text-muted-foreground">
            Пост не существует или был удален
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link to="/posts">
            <ArrowLeft className="h-4 w-4" />
            Вернуться ко всем постам
          </Link>
        </Button>
      </div>
    </div>
  );
}
