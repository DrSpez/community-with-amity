import useAmityUser from "../hooks/useAmityUser";
import { useAmityAuthState } from "../providers/AmityAuthProvider";
import deleteComment from "../utils/deleteComment";
import ReactionButton from "./ReactionButton";

const Comment = ({ comment }: { comment: Amity.InternalComment }) => {
  const { userID } = useAmityAuthState();
  const {
    // @ts-ignore FIXME: fix the typescript error. Need to narrow the type somehow
    data: { text },
    commentId: commentID,
    myReactions,
  } = comment;
  const { user: authorUser } = useAmityUser({ userID: comment.userId });
  const showRemoveButton = authorUser?.userId === userID;
  return (
    <div className="comment-container">
      <div className="row-container justify-space-between">
        <div>
          <p>Author: {authorUser?.displayName}</p>
          <p>{text}</p>
          <p>Reactions count: {comment.reactionsCount}</p>
        </div>
        {showRemoveButton && (
          <button
            className="remove-button"
            onClick={() => {
              deleteComment({ commentID: comment.commentId, hardDelete: true });
            }}
          >
            X
          </button>
        )}
      </div>
      <div className="row-container">
        <ReactionButton
          referenceID={commentID}
          referenceType="comment"
          reactionType="like"
          myReactions={myReactions}
        />
        <ReactionButton
          referenceID={commentID}
          referenceType="comment"
          reactionType="frown"
          myReactions={myReactions}
        />
      </div>
    </div>
  );
};

export default Comment;
