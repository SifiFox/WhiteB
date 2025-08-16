import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { usePosts } from '@/lib/hooks';
import { withPostsAsyncState } from '@/components/hoc/with-async-state';
import type { Post } from '@/lib/types';

interface PostsListProps {
  posts: Post[];
}

function PostsList({ posts }: PostsListProps) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Все посты</h1>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to="/posts/$postId"
            params={{ postId: post.id.toString() }}
            className="block p-4 border rounded-lg hover:shadow-md transition-all bg-card"
          >
            <div className="flex items-start gap-4">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                  {post.body}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Автор: {post.userId}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const PostsListWithState = withPostsAsyncState(PostsList);

function Posts() {
  const { data: posts = [], isLoading, error } = usePosts();

  return (
    <PostsListWithState
      posts={posts}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Route = createLazyFileRoute('/posts')({
  component: Posts,
});

