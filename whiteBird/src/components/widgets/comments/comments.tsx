import { useComments } from '@/lib/hooks/use-comments';
import { withCommentsAsyncState } from '@/components/hoc/with-async-state';
import { CommentsList } from './comments-list';

interface CommentsProps {
  postId: string;
}

const CommentsWithAsyncState = withCommentsAsyncState(CommentsList);

export function Comments({ postId }: CommentsProps) {
  const { data: comments = [], isLoading, error } = useComments(postId);

  return (
    <CommentsWithAsyncState
      isLoading={isLoading}
      error={error}
      postId={postId}
      comments={comments}
    />
  );
}
