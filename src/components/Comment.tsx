import useAmityUser from "../hooks/useAmityUser";
import ReactionButton from "./ReactionButton";

const Comment = ({ comment }: { comment: Amity.InternalComment }) => {
  const {
    // @ts-ignore FIXME: fix the typescript error. Need to narrow the type somehow
    data: { text },
    commentId: commentID,
    myReactions,
  } = comment;
  const { user: authorUser } = useAmityUser({ userID: comment.userId });
  return (
    <div className="comment-container">
      <p>Author: {authorUser?.displayName}</p>
      <p>{text}</p>
      <p>Reactions count: {comment.reactionsCount}</p>
      <ReactionButton
        referenceID={commentID}
        referenceType="comment"
        reactionType="like"
        myReactions={myReactions}
      />
    </div>
  );
};

export default Comment;
