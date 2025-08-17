import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ThumbsUp, ThumbsDown, Calendar } from 'lucide-react';
import { PostActionsDropdown } from './post-actions-dropdown';
import { useCurrentUser, useIsAdmin } from '@/lib/hooks/use-auth';
import { useToggleLike, useLikes } from '@/lib/hooks/use-likes';
import { useToggleFavorite, useIsFavorite } from '@/lib/hooks/use-favorites';
import { useUsers } from '@/lib/hooks/use-users';
import type { Post as PostType } from '@/lib/types';
import { PostComments } from './post-comments';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { data: currentUser } = useCurrentUser();
  const isAdmin = useIsAdmin();
  const { data: users = [] } = useUsers();
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
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {author ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-10 h-10 rounded-full ring-2 ring-background shadow-md"
                      />
                      <div>
                        <p className="font-semibold text-foreground text-base">{author.name}</p>
                        <p className="text-sm text-muted-foreground">@{author.username}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted" />
                      <div>
                        <p className="font-semibold text-foreground">Неизвестный автор</p>
                        <p className="text-sm text-muted-foreground">@unknown</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</span>
                  </div>
                  {post.updatedAt !== post.createdAt && (
                    <span className="text-xs block mt-1">
                      (изменено {new Date(post.updatedAt).toLocaleDateString('ru-RU')})
                    </span>
                  )}
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {canManage && (
              <PostActionsDropdown post={post} />
            )}
          </div>
        </CardHeader>

        <CardContent>
          {post.imageUrl && (
            <div className="mb-6">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full max-h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose max-w-none mb-6">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {post.body}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              {currentUser && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike('like')}
                    disabled={toggleLike.isPending}
                    className={`gap-2 ${userLike?.type === 'like' ? 'text-green-600 bg-green-50' : ''} ${toggleLike.isPending ? 'opacity-70' : ''}`}
                  >
                    <ThumbsUp className={`h-4 w-4 ${toggleLike.isPending ? 'animate-pulse' : ''}`} />
                    <span>{post.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike('dislike')}
                    disabled={toggleLike.isPending}
                    className={`gap-2 ${userLike?.type === 'dislike' ? 'text-red-600 bg-red-50' : ''} ${toggleLike.isPending ? 'opacity-70' : ''}`}
                  >
                    <ThumbsDown className={`h-4 w-4 ${toggleLike.isPending ? 'animate-pulse' : ''}`} />
                    <span>{post.dislikes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleFavorite}
                    disabled={toggleFavorite.isPending}
                    className={`gap-2 ${isFavorite ? 'text-red-600 bg-red-50' : ''} ${toggleFavorite.isPending ? 'opacity-70' : ''}`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''} ${toggleFavorite.isPending ? 'animate-pulse' : ''}`} />
                    {isFavorite ? 'В избранном' : 'В избранное'}
                  </Button>
                </>
              )}
            </div>

            {!currentUser && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-4 w-4" />
                  <span>{post.dislikes}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <PostComments postId={post.id} />
      </div>
    </div>
  );
}
