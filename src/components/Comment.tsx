import useAmityEntityReported from "../hooks/useAmityEntityReported";
import useAmityUser from "../hooks/useAmityUser";
import { useAmityAuthState } from "../providers/AmityAuthProvider";
import deleteComment from "../utils/deleteComment";
import ReactionButton from "./ReactionButton";
import ReportButton from "./ReportButton";

import { MAX_FLAGS_COUNT } from "../config";

const Comment = ({ comment }: { comment: Amity.InternalComment }) => {
  const { userID } = useAmityAuthState();
  const {
    // @ts-ignore FIXME: fix the typescript error. Need to narrow the type somehow
    data: { text },
    commentId: commentID,
    myReactions,
    reactionsCount,
    flagCount,
  } = comment;
  const { user: authorUser } = useAmityUser({ userID: comment.userId });
  const showRemoveButton = authorUser?.userId === userID;
  const { isReportedByMe } = useAmityEntityReported({
    referenceType: "comment",
    referenceID: commentID,
    flagCount,
  });
  const isAuthor = userID === authorUser?.userId;
  const showReportButton = !isAuthor && !isReportedByMe;
  const isCommentHidden = flagCount >= MAX_FLAGS_COUNT;
  if (isCommentHidden) return null;
  return (
    <div className="comment-container">
      <div className="row-container justify-space-between">
        <div>
          <p>Author: {authorUser?.displayName}</p>
          <p>{text}</p>
          <p>Reactions count: {reactionsCount}</p>
          <p>Flag count: {flagCount}</p>
        </div>
        {showRemoveButton && (
          <button
            className="remove-button"
            onClick={() => {
              deleteComment({ commentID, hardDelete: true });
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
        {showReportButton && (
          <ReportButton referenceType="comment" referenceID={commentID} />
        )}
      </div>
    </div>
  );
};

export default Comment;
