import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Send } from 'lucide-react';
import { useComments, useCreateComment } from '@/lib/hooks/use-comments';
import { useCurrentUser } from '@/lib/hooks/use-auth';
import { toast } from 'sonner';
import type { Comment } from '@/lib/types';

interface PostCommentsProps {
  postId: string;
}

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
          {comment.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.name}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {comment.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PostComments({ postId }: PostCommentsProps) {
  const [newComment, setNewComment] = useState({ name: '', email: '', body: '' });
  const { data: currentUser } = useCurrentUser();
  const { data: comments = [], isLoading } = useComments(postId);
  const createComment = useCreateComment();

  // Инициализируем форму данными текущего пользователя
  useState(() => {
    if (currentUser) {
      setNewComment(prev => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
      }));
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.body.trim()) {
      toast.error('Введите текст комментария');
      return;
    }

    if (!currentUser && (!newComment.name.trim() || !newComment.email.trim())) {
      toast.error('Заполните имя и email');
      return;
    }

    try {
      await createComment.mutateAsync({
        postId,
        userId: currentUser?.id || '',
        name: currentUser?.name || newComment.name,
        email: currentUser?.email || newComment.email,
        body: newComment.body,
      });

      setNewComment(prev => ({ ...prev, body: '' }));
      toast.success('Комментарий добавлен');
    } catch {
      toast.error('Ошибка при добавлении комментария');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Загрузка комментариев...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Комментарии ({comments.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Форма добавления комментария */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!currentUser && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="comment-name">Имя</Label>
                <Input
                  id="comment-name"
                  value={newComment.name}
                  onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ваше имя"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment-email">Email</Label>
                <Input
                  id="comment-email"
                  type="email"
                  value={newComment.email}
                  onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="comment-body">Комментарий</Label>
            <div className="flex gap-2">
              <Input
                id="comment-body"
                value={newComment.body}
                onChange={(e) => setNewComment(prev => ({ ...prev, body: e.target.value }))}
                placeholder="Напишите ваш комментарий..."
                className="flex-1"
                required
              />
              <Button
                type="submit"
                disabled={createComment.isPending}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {createComment.isPending ? 'Отправка...' : 'Отправить'}
              </Button>
            </div>
          </div>
        </form>

        {comments.length > 0 && <Separator />}

        {/* Список комментариев */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Комментариев пока нет</p>
              <p className="text-sm">Станьте первым, кто оставит комментарий!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
