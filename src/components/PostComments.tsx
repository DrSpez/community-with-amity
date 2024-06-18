import Comment from "./Comment";

import useAmityCommentsTopic from "../hooks/useAmityCommentsTopic";

const PostComments = ({ post }: { post: Amity.Post }) => {
  const { comments, hasMore, onLoadMore } = useAmityCommentsTopic({ post });
  return (
    <div>
      {comments?.map((comment) => {
        return <Comment key={comment.commentId} comment={comment} />;
      })}
      {hasMore && (
        <button className="space-top" onClick={onLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
};

export default PostComments;
