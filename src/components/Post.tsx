import { useNavigate } from "react-router-dom";

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
}: {
  post: Amity.Post;
  showDetailsLink?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="post-container">
      <table>
        <tbody>
          <Row name="Creator" value={post.creator.displayName} />
          <Row name="Text" value={post.data.text} />
          <Row name="Reactions count" value={post.reactionsCount} />
          <Row name="Comments count" value={post.commentsCount} />
        </tbody>
      </table>
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
