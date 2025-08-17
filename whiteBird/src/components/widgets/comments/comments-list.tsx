import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageCircle } from 'lucide-react';
import { FormComment } from '@/components/ui/forms/form-comment';
import { CommentItem } from './comment-item';
import type { Comment } from '@/lib/types';

interface CommentsListProps {
  postId: string;
  comments: Comment[];
}

export function CommentsList({ postId, comments }: CommentsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Комментарии ({comments.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormComment postId={postId} />

        {comments.length > 0 && <Separator />}

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
