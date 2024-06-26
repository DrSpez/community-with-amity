import { useMemo } from "react";

import { FeedType } from "../types";
import Post from "./Post";
import PostCreator from "./PostCreator";
import UserInfo from "./UserInfo";
import { AMITY_COMMUNITY_ID } from "../config";

import useAmityCommunityPostsTopic from "../hooks/useAmityCommunityPostsTopic";
import useAmityPostCount from "../hooks/useAmityPostCount";

interface Props {
  userID: string;
  displayName: string;
  feedType: FeedType;
}
const Feed = ({ userID, displayName, feedType }: Props) => {
  const todayTag = "06/26/2024";

  const createPostTags = useMemo(() => [userID, todayTag], [userID, todayTag]);
  const getTodayFeedTags = useMemo(() => [todayTag], [todayTag]);
  const getUserFeedTags = useMemo(() => [userID], [userID]);
  const tags = feedType === "user" ? getUserFeedTags : getTodayFeedTags;

  const { posts, hasMore, onLoadMore } = useAmityCommunityPostsTopic({
    communityID: AMITY_COMMUNITY_ID,
    tags,
  });
  const postCount = useAmityPostCount({ tags });
  return (
    <div className="center-container">
      <div className="column-third">
        <UserInfo />
        <PostCreator tags={createPostTags} />
        <p className="white-text">
          {`[BETA API] search by tags: ${JSON.stringify(tags)} Post count:
          ${postCount}`}
        </p>
        {posts?.map((post) => {
          return (
            <Post key={`${post._id}-${post.creator.userId}`} post={post} />
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
