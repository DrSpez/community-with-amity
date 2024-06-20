import { useNavigate } from "react-router-dom";
import ReactionButton from "./ReactionButton";
import deletePost from "../utils/deletePost";

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
  showDetailsLink,
  showRemoveButton,
}: {
  post: Amity.Post;
  showDetailsLink?: boolean;
  showRemoveButton?: boolean;
}) => {
  const navigate = useNavigate();
  const {
    _id: postID,
    creator,
    data: { text },
    reactionsCount,
    commentsCount,
    myReactions,
  } = post;
  return (
    <div className="post-container">
      <div className="row-container justify-space-between">
        <table>
          <tbody>
            {/* // FIXME: remove the ?., there has to be creator */}
            <Row name="Creator" value={creator?.displayName} />
            <Row name="Text" value={text} />
            <Row name="Reactions count" value={reactionsCount} />
            <Row name="Comments count" value={commentsCount} />
          </tbody>
        </table>
        {showRemoveButton && (
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
