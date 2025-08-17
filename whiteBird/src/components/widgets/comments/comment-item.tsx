import type { Comment } from '@/lib/types';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
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
