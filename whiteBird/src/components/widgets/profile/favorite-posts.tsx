import { useFavorites } from '@/lib/hooks/use-favorites';
import { usePosts } from '@/lib/hooks/use-posts';
import { PostPreview } from '@/components/widgets/post/post-preview';
import { Heart } from 'lucide-react';
import type { AuthUser } from '@/lib/types';

interface FavoritePostsProps {
  user: AuthUser;
}

export function FavoritePosts({ user }: FavoritePostsProps) {
  const { data: favorites = [] } = useFavorites(user.id);
  const { data: allPosts = [] } = usePosts();

  const favoritePosts = allPosts.filter(post =>
    favorites.some(fav => fav.postId === post.id),
  );

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500" />
        Избранные посты ({favoritePosts.length})
      </h3>

      {favoritePosts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {favoritePosts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-muted-foreground text-lg mb-2">Избранных постов пока нет</p>
          <p className="text-muted-foreground text-sm">
            Добавляйте посты в избранное, нажимая на иконку сердечка
          </p>
        </div>
      )}
    </div>
  );
}
