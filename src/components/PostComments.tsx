import Comment from "./Comment";

import useAmityCommentsTopic from "../hooks/useAmityCommentsTopic";

const PostComments = ({ postID }: { postID: string }) => {
  const { comments } = useAmityCommentsTopic({ postID });
  return (
    <div>
      Comments response: {JSON.stringify(comments)}
      {/* {comments.map((comment) => {
        <Comment key={comment._id} comment={comment} />;
      })} */}
    </div>
  );
};

export default PostComments;
