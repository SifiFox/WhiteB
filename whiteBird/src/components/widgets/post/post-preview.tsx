import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCurrentUser, useIsAdmin } from '@/lib/hooks/use-auth';
import { useToggleLike, useLikes } from '@/lib/hooks/use-likes';
import { useToggleFavorite, useIsFavorite } from '@/lib/hooks/use-favorites';
import { useComments } from '@/lib/hooks/use-comments';
import { useUsers } from '@/lib/hooks/use-users';
import type { Post } from '@/lib/types';
import { PostActionsDropdown } from './post-actions-dropdown';

interface PostPreviewProps {
  post: Post;
}

export function PostPreview({ post }: PostPreviewProps) {
  const { data: currentUser } = useCurrentUser();
  const isAdmin = useIsAdmin();
  const { data: users = [] } = useUsers();
  const { data: comments = [] } = useComments(post.id);
  const { data: likes = [] } = useLikes(post.id);
  const toggleLike = useToggleLike();
  const toggleFavorite = useToggleFavorite();

  const author = users.find(u => u.id === post.userId);
  const isFavorite = useIsFavorite(currentUser?.id || '', post.id);
  const userLike = currentUser ? likes.find(l => l.userId === currentUser.id) : null;

  const canManage = currentUser && (isAdmin || currentUser.id === post.userId);

  const handleLike = (type: 'like' | 'dislike') => {
    if (!currentUser) return;

    toggleLike.mutate({
      userId: currentUser.id,
      postId: post.id,
      type,
    });
  };

  const handleToggleFavorite = () => {
    if (!currentUser) return;

    toggleFavorite.mutate({
      userId: currentUser.id,
      postId: post.id,
    });
  };

  return (
    <TooltipProvider>
      <Card className="group overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-card pt-0 gap-2">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <MessageCircle className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}

          {canManage && (
            <div className="absolute top-2 right-2 transition-opacity">
              <div className="bg-background/80 backdrop-blur-sm rounded-md">
                <PostActionsDropdown post={post} />
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 2 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="text-xs px-2 py-0.5 cursor-help">
                        +{post.tags.length - 2}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex flex-col gap-1 max-w-xs">
                        {post.tags.slice(2).map((tag, index) => (
                          <span key={index} className="text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}

            {isAdmin && post.priority && post.priority > 1 && (
              <Badge variant="destructive" className="text-xs px-2 py-0.5">
                Приоритет {post.priority}
              </Badge>
            )}
          </div>

          <Link
            to="/posts/$postId"
            params={{ postId: post.id.toString() }}
            className="block group/link"
          >
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover/link:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {post.body}
          </p>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              {author ? (
                <>
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-7 h-7 rounded-full ring-2 ring-background shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground leading-none">{author.name}</span>
                    <span className="text-xs text-muted-foreground">@{author.username}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-muted" />
                  <span className="text-sm text-muted-foreground">Неизвестный автор</span>
                </div>
              )}
            </div>

            <span className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: '2-digit',
              })}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length}</span>
            </div>

            <div className="flex items-center gap-1">
              {currentUser ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike('like')}
                    className={`h-8 px-2 gap-1 ${
                      userLike?.type === 'like'
                        ? 'text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100'
                        : 'hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-xs">{post.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike('dislike')}
                    className={`h-8 px-2 gap-1 ${
                      userLike?.type === 'dislike'
                        ? 'text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100'
                        : 'hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-xs">{post.dislikes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleFavorite}
                    className={`h-8 w-8 p-0 ${
                      isFavorite
                        ? 'text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100'
                        : 'hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    <span>{post.dislikes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
