import type { Comment } from 'utils/api/types';

interface ExistingCommentProps {
  comment: Comment;
}

export function ExistingComment({ comment }: ExistingCommentProps) {
  return <div>{comment.body}</div>;
}
