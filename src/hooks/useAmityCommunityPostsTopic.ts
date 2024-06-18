import {
  getCommunityTopic,
  getUserTopic,
  PostRepository,
  subscribeTopic,
  SubscriptionLevels,
} from "@amityco/ts-sdk";
import { useEffect, useState } from "react";

import { useAmityAuthState } from "../providers/AmityAuthProvider";
import useAmityCommunity from "./useAmityCommunity";

const useAmityCommunityPostsTopic = ({
  communityID,
  tags,
}: {
  communityID: string;
  tags: string[];
}) => {
  const [posts, setPosts] = useState<Amity.Post[]>();
  const [hasMore, setHasMore] = useState<boolean>();
  const [onLoadMoreObj, setOnLoadMoreObj] = useState<any>({});

  const { isConnected } = useAmityAuthState();
  const { community } = useAmityCommunity({ communityID });

  const disposers: Amity.Unsubscriber[] = [];
  let isSubscribed = false;

  const subscribeCommunityTopic = ({
    community,
  }: {
    community: Amity.Community;
  }) => {
    if (isSubscribed) return;

    disposers.push(
      subscribeTopic(
        getCommunityTopic(community, SubscriptionLevels.POST),
        () => {
          // use callback to handle errors with event subscription
        }
      )
    );
    isSubscribed = true;
  };

  useEffect(() => {
    if (isConnected && community) {
      /*
       * Possible params for getPosts:
       * targetType: 'global' | 'user' | 'community' | 'my' | 'content';
       * targetId: string; // postId or communityId
       * sortBy?: 'lastCreated' | 'firstCreated';
       * dataType?: ('image' | 'file' | 'video' | 'liveStream' | 'poll')[];
       * isDeleted?: boolean;
       * hasFlag?: boolean;
       * feedType?: 'reviewing' | 'published';
       * tags?: string[];
       * matchingOnlyParentPost?: boolean;
       * page?: { limit: number; before?: string; after?: string };
       */
      const unsubscribe = PostRepository.getPosts(
        { targetId: communityID, targetType: "community", tags },
        ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
          setPosts(posts);
          setHasMore(hasNextPage);
          setOnLoadMoreObj({
            func: () => {
              // NOTE: have to wrap this function with () => onNextPage?.(), if used directly like onClick={onNextPage} it does not work properly
              onNextPage?.();
            },
          });
          /*
           * this is only required if you want real time updates for each
           * community in the collection
           */
          subscribeCommunityTopic({ community });
        }
      );

      /*
       * if you only wish to get a collection or list of paginated posts without
       * any real time updates you can unsubscribe immediately after you call the
       * collection.
       * ex: unsubscribe()
       */
      disposers.push(unsubscribe);
    }
    return () => {
      disposers.forEach((fn) => fn());
    };
  }, [isConnected, community, tags]);

  return { posts, hasMore, onLoadMore: onLoadMoreObj.func };
};

export default useAmityCommunityPostsTopic;
