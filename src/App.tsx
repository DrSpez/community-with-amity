import logo from "./logo.svg";
import "./App.css";

import { Client, API_REGIONS } from "@amityco/ts-sdk";

import { AMITY_API_KEY, AMITY_COMMUNITY_ID } from "./config";
import useAmityLogin from "./hooks/useAmityLogin";
import useAmityPostsTopic from "./hooks/useAmityPostsTopic";
import Post from "./components/Post";

const initAmityClient = () =>
  // Only required to do once in the lifetime of the application
  Client.createClient(AMITY_API_KEY, API_REGIONS.US); // SG is the default
const client = initAmityClient();

function App() {
  const userID = "test-user-1";
  const displayName = "Test User One";
  const { isConnected } = useAmityLogin({ userID, displayName });
  const { posts, hasMore, onLoadMore } = useAmityPostsTopic({
    isConnected,
    targetType: "community",
    targetId: AMITY_COMMUNITY_ID,
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        {posts?.map((post) => (
          <Post post={post} />
        ))}
        {hasMore && <button onClick={onLoadMore}>Load more</button>}
      </div>
    </div>
  );
}

export default App;
