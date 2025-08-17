import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DialogEditPost } from '@/components/ui/dialogs/dialog-edit-post';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useDeletePost } from '@/lib/hooks/use-posts';
import { toast } from 'sonner';
import type { Post } from '@/lib/types';
import { DialogConfirm } from '@/components/ui/dialogs/dialog-confirm';

interface PostActionsDropdownProps {
  post: Post;
}

export function PostActionsDropdown({ post }: PostActionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const deletePost = useDeletePost();

  const handleDelete = () => {
    deletePost.mutate(post.id, {
      onSuccess: () => {
        toast.success('Пост успешно удален');
      },
      onError: () => {
        toast.error('Ошибка при удалении поста');
      },
    });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DialogEditPost post={post}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Редактировать
          </DropdownMenuItem>
        </DialogEditPost>

        <DropdownMenuSeparator />

        <DialogConfirm
          title="Вы уверены, что хотите удалить этот пост?"
          description="Это действие не может быть отменено. Это приведет к удалению вашего поста и удалению ваших данных с наших серверов."
          onConfirm={handleDelete}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Удалить
          </DropdownMenuItem>
        </DialogConfirm>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
