import {
  CommentRepository,
  getPostTopic,
  subscribeTopic,
  SubscriptionLevels,
} from "@amityco/ts-sdk";
import { useEffect, useState } from "react";
import { AMITY_COMMUNITY_ID } from "../config";
import useAmityCommunity from "./useAmityCommunity";
import useAmityUser from "./useAmityUser";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

const disposers: Amity.Unsubscriber[] = [];

const useAmityCommentsTopic = ({ post }: { post: Amity.Post }) => {
  const [commentsData, setCommentsData] = useState<Amity.InternalComment[]>();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [onLoadMoreObj, setOnLoadMoreObj] = useState<{
    onLoadMore: (() => void) | undefined;
  }>({ onLoadMore: () => {} });

  const { isConnected, userID } = useAmityAuthState();
  const { user } = useAmityUser({ userID });
  const { community } = useAmityCommunity({ communityID: AMITY_COMMUNITY_ID });

  useEffect(() => {
    if (isConnected && user && community) {
      const textOnlyParam: Amity.CommentLiveCollection = {
        referenceType: "post",
        referenceId: post._id,
        dataTypes: {
          values: ["text"],
          matchType: "exact",
        },
        limit: 5,
      };

      disposers.push(
        CommentRepository.getComments(
          textOnlyParam,
          ({ data: comments, onNextPage, hasNextPage, loading, error }) => {
            setCommentsData(comments);
            setHasMore(hasNextPage || false);
            setOnLoadMoreObj({ onLoadMore: onNextPage });
          }
        )
      );

      if (post) {
        disposers.push(
          subscribeTopic(getPostTopic(post, SubscriptionLevels.COMMENT))
        );
      }
    }
    return () => {
      disposers.forEach((fn) => fn());
    };
  }, [isConnected, user, community, post]);

  return {
    comments: commentsData,
    hasMore,
    onLoadMore: onLoadMoreObj?.onLoadMore,
  };
};

export default useAmityCommentsTopic;
