import logo from "../logo.svg";
import "../App.css";

import { Client, API_REGIONS } from "@amityco/ts-sdk";

import { AMITY_API_KEY, AMITY_COMMUNITY_ID } from "../config";
import useAmityPostsTopic from "../hooks/useAmityPostsTopic";
import Post from "../components/Post";
import PostCreator from "../components/PostCreator";
import UserInfo from "../components/UserInfo";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

const initAmityClient = () =>
  // Only required to do once in the lifetime of the application
  Client.createClient(AMITY_API_KEY, API_REGIONS.US); // SG is the default
const client = initAmityClient();

function App() {
  const { userID, displayName } = useAmityAuthState();
  const { posts, hasMore, onLoadMore } = useAmityPostsTopic({
    targetType: "community",
    targetId: AMITY_COMMUNITY_ID,
  });

  if (!userID || !displayName) return null;
  const tags = [userID, "06/11/2024"];
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="center-container">
        <div className="column-third">
          <UserInfo userID={userID} displayName={displayName} />
          <PostCreator userID={userID} tags={tags} />
          {posts?.map((post) => {
            const isOwnPost = post.creator?.userId === String(userID);
            return (
              <Post
                key={`${post._id}-${post.creator.userId}`}
                post={post}
                showDetailsLink
                showRemoveButton={isOwnPost}
              />
            );
          })}
          {hasMore && (
            <button onClick={onLoadMore} className="space-top">
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
