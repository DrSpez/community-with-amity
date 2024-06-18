import { useMemo } from "react";

import { FeedType } from "../types";
import Post from "./Post";
import PostCreator from "./PostCreator";
import UserInfo from "./UserInfo";
import { AMITY_COMMUNITY_ID } from "../config";

import useAmityPostsTopic from "../hooks/useAmityCommunityPostsTopic";

interface Props {
  userID: string;
  displayName: string;
  feedType: FeedType;
}
const Feed = ({ userID, displayName, feedType }: Props) => {
  const todayTag = "06/11/2024"; // TODO: get the today date. In real implementation we might want to pay attention to users' timezone and also still show yesterdays posts up until 3am local

  const createPostTags = useMemo(() => [userID, todayTag], [userID, todayTag]);
  const getTodayFeedTags = useMemo(() => [todayTag], [todayTag]);
  const getUserFeedTags = useMemo(() => [userID], [userID]);

  const { posts, hasMore, onLoadMore } = useAmityPostsTopic({
    communityID: AMITY_COMMUNITY_ID,
    tags: feedType === "user" ? getUserFeedTags : getTodayFeedTags,
  });
  return (
    <div className="center-container">
      <div className="column-third">
        <UserInfo userID={userID} displayName={displayName} />
        <PostCreator userID={userID} tags={createPostTags} />
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
  );
};

export default Feed;
