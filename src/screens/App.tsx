import logo from "../logo.svg";
import "../App.css";

import { useEffect, useState } from "react";
import { Client, API_REGIONS } from "@amityco/ts-sdk";

import { AMITY_API_KEY } from "../config";

import Feed from "../components/Feed";
import FeedSwitchButton from "../components/FeedSwitchButton";
import { useAmityAuthState } from "../providers/AmityAuthProvider";
import getFilteredPostCount from "../utils/getFilteredPostCount";
import { FeedType } from "../types";

// const initAmityClient = () =>
//   // Only required to do once in the lifetime of the application
//  Client.createClient(AMITY_API_KEY, API_REGIONS.US); // SG is the default

// initAmityClient();

function App() {

  const client = Client.createClient(AMITY_API_KEY, API_REGIONS.US);


  const { authToken, userID, displayName } = useAmityAuthState();
  const [feedType, setFeedType] = useState<FeedType>("today");
  const [postCount, setPostCount] = useState<number>();

  useEffect(() => {
    if (client.token?.accessToken) {
      const getCounts = async () => {
        const count = await getFilteredPostCount({ accessToken: client.token?.accessToken as string, tags:['test'] },);
        setPostCount(count);
      };
      getCounts();
    }
  }, [client.token?.accessToken]);
  if (!userID || !displayName) return null;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <FeedSwitchButton
          text="Today's posts"
          onClick={() => {
            setFeedType("today");
          }}
        />
        <FeedSwitchButton
          text="My posts"
          onClick={() => {
            setFeedType("user");
          }}
        />
        <p className="white-text">Post count: {postCount}</p>
      </div>
      <Feed userID={userID} displayName={displayName} feedType={feedType} />
    </div>
  );
}

export default App;
