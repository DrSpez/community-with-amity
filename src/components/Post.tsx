import { useNavigate } from "react-router-dom";
import ReactionButton from "./ReactionButton";
import deletePost from "../utils/deletePost";
import ReportButton from "./ReportButton";
import { useAmityAuthState } from "../providers/AmityAuthProvider";
import useAmityEntityReported from "../hooks/useAmityEntityReported";
import { MAX_FLAGS_COUNT } from "../config";

const Row = ({ name, value }: { name: string; value: string }) => {
  return (
    <tr className="left-text">
      <th>{name}:</th>
      <td>{value}</td>
    </tr>
  );
};
const Post = ({
  post,
  detailedView,
}: {
  post: Amity.Post;
  detailedView?: boolean;
}) => {
  const { userID } = useAmityAuthState();

  const navigate = useNavigate();
  const {
    _id: postID,
    creator,
    data: { text },
    reactionsCount,
    commentsCount,
    myReactions,
    flagCount,
    metaData: { questionText = "" } = {},
  } = post;

  const isAuthor = post.creator?.userId === userID;

  const { isReportedByMe } = useAmityEntityReported({
    flagCount,
    referenceType: "post",
    referenceID: postID,
  });
  const showDetailsLink = !detailedView;
  const showQuestionPrompt = detailedView;
  const showReportButton = !isAuthor && !isReportedByMe;
  const isPostHidden = flagCount >= MAX_FLAGS_COUNT;
  if (isPostHidden) return null;
  return (
    <div className="post-container">
      <div className="row-container justify-space-between">
        <table>
          <tbody>
            <Row name="Creator" value={creator.displayName} />
            {showQuestionPrompt && <Row name="Question" value={questionText} />}
            <Row name="Answer" value={text} />
            <Row name="Reactions count" value={reactionsCount} />
            <Row name="Comments count" value={commentsCount} />
            <Row name="Flag count" value={flagCount} />
          </tbody>
        </table>
        {isAuthor && (
          <button
            className="remove-button"
            onClick={() => {
              deletePost({ postID, hardDelete: true });
            }}
          >
            X
          </button>
        )}
      </div>
      <div className="row-container">
        <ReactionButton
          referenceID={postID}
          referenceType="post"
          reactionType="like"
          myReactions={myReactions}
        />
        <ReactionButton
          referenceID={postID}
          referenceType="post"
          reactionType="frown"
          myReactions={myReactions}
        />
        {showReportButton && (
          <ReportButton referenceType="post" referenceID={postID} />
        )}
      </div>
      {showDetailsLink && (
        <button
          className="space-top"
          onClick={() => {
            navigate(`/post/${postID}`);
          }}
        >
          Post details
        </button>
      )}
    </div>
  );
};

export default Post;
