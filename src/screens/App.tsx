import logo from "../logo.svg";
import "../App.css";

import { useState } from "react";
import { Client, API_REGIONS } from "@amityco/ts-sdk";

import { AMITY_API_KEY, AMITY_COMMUNITY_ID } from "../config";
import useAmityPostsTopic from "../hooks/useAmityCommunityPostsTopic";

import Feed from "../components/Feed";
import FeedSwitchButton from "../components/FeedSwitchButton";
import { useAmityAuthState } from "../providers/AmityAuthProvider";
import { FeedType } from "../types";

const initAmityClient = () =>
  // Only required to do once in the lifetime of the application
  Client.createClient(AMITY_API_KEY, API_REGIONS.US); // SG is the default
const client = initAmityClient();

function App() {
  const { userID, displayName } = useAmityAuthState();
  const [feedType, setFeedType] = useState<FeedType>("today");

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
      </div>
      <Feed userID={userID} displayName={displayName} feedType={feedType} />
    </div>
  );
}

export default App;
