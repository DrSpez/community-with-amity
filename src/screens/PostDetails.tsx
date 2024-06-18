import { useParams } from "react-router-dom";

import Post from "../components/Post";
import PostComments from "../components/PostComments";

import logo from "../logo.svg";
import useAmityPostTopic from "../hooks/useAmityPostTopic";
import CommentCreator from "../components/CommentCreator";

const PostDetails = () => {
  const { postID } = useParams();
  const { post } = useAmityPostTopic({ postID: postID || "" });
  const isLoading = !post || !postID;

  if (isLoading) return null;
  return (
    <div className="App white-text">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="center-container">
        <div className="column-third">
          <p>Post ID: {postID} </p>
          <Post post={post} />
          <CommentCreator postID={postID} />
          <PostComments post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
