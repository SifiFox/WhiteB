import { createFileRoute, Link } from '@tanstack/react-router';
import { usePost } from '@/lib/hooks/use-posts';
import { Post } from '@/components/widgets/post/post';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { withPostDetailAsyncState } from '@/components/hoc/with-async-state';
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

const PostDetailWithAsyncState = withPostDetailAsyncState(PostDetailContent);

function PostDetailPage() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, error } = usePost(postId);

  return (
    <PostDetailWithAsyncState
      isLoading={isLoading}
      error={error || (!post ? new Error(`Пост с ID ${postId} не существует или был удален`) : null)}
      post={post!}
    />
  );
}
