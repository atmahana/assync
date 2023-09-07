import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <div className="p-1 space-y-1 overflow-hidden bg-transparent">
      {comments.map((comment: Record<string, any>) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentFeed;
