const Row = ({ name, value }: { name: string; value: string }) => {
  return (
    <tr>
      <td>{name}:</td>
      <td>{value}</td>
    </tr>
  );
};
const Post = ({ post }: { post: any }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        padding: "10px 20px",
        marginTop: 10,
      }}
    >
      <table>
        <Row name="Creator" value={post.creator.displayName} />
        <Row name="Text" value={post.data.text} />
        <Row name="Reactions count" value={post.reactionsCount} />
        <Row name="Comments count" value={post.commentsCount} />
      </table>
    </div>
  );
};

export default Post;
