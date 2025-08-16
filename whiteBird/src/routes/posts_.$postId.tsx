import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts_/$postId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  return (
    <div className="p-4 border rounded-lg my-4">
      <h2 className="text-2xl font-bold mb-4">Post Details</h2>
      <p className="text-lg">Viewing post with ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{postId}</span></p>
    </div>
  );
}
