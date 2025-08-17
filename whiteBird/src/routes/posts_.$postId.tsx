import { createFileRoute, Link } from '@tanstack/react-router';
import { usePost } from '@/lib/hooks/use-posts';
import { Post } from '@/components/widgets/post/post';
import { PostNotFound } from '@/components/widgets/post/post-not-found';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Post as PostType } from '@/lib/types';

export const Route = createFileRoute('/posts_/$postId')({
  component: PostDetailPage,
});

interface PostDetailContentProps {
  post: PostType;
}

function PostDetailContent({ post }: PostDetailContentProps) {
  return (
    <div>
      <div className="container mx-auto px-6 pt-6 pb-2 max-w-4xl">
        <Button asChild variant="ghost" className="gap-2">
          <Link to="/posts">
            <ArrowLeft className="h-4 w-4" />
            Вернуться к постам
          </Link>
        </Button>
      </div>
      <Post post={post} />
    </div>
  );
}

function PostDetailPage() {
  const { postId } = Route.useParams();
  const { data: post, isLoading } = usePost(postId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-lg text-muted-foreground">Загрузка поста...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <PostNotFound />;
  }

  // Показываем пост
  return <PostDetailContent post={post} />;
}
