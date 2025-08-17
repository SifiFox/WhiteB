import { Comments } from '@/components/widgets/comments';

interface PostCommentsProps {
  postId: string;
}

export function PostComments({ postId }: PostCommentsProps) {
  return <Comments postId={postId} />;
}
