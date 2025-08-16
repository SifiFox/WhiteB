import { createLazyFileRoute, Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/posts')({
  component: Posts,
});

function Posts() {
  const posts = [1, 2, 3, 4, 5];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Posts Section</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Available Posts:</h2>
        <div className="grid gap-2">
          {posts.map(postId => (
            <Link
              key={postId}
              to="/posts/$postId"
              params={{ postId: postId.toString() }}
              className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Post {postId}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

