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
  return (
    <div className="post-container">
      <div className="row-container">
        <table>
          <tbody>
            <Row name="Creator" value={post.creator.displayName} />
            <Row name="Text" value={post.data.text} />
            <Row name="Reactions count" value={post.reactionsCount} />
            <Row name="Comments count" value={post.commentsCount} />
          </tbody>
        </table>
        {showRemoveButton && (
          <button
            className="remove-button"
            onClick={() => {
              deletePost({ postID: post._id, hardDelete: true });
            }}
          >
            X
          </button>
        )}
      </div>
      <ReactionButton
        referenceID={post._id}
        referenceType={"post"}
        myReactions={post.myReactions}
        reactionType="like"
      />
      {showDetailsLink && (
        <button
          className="space-top"
          onClick={() => {
            navigate(`/post/${post._id}`);
          }}
        >
          Post details
        </button>
      )}
    </div>
  );
};

export default Post;
