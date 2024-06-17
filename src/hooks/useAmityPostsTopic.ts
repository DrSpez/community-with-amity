import {
  getCommunityTopic,
  getUserTopic,
  PostRepository,
  subscribeTopic,
  SubscriptionLevels,
} from "@amityco/ts-sdk";
import { useEffect, useState } from "react";

import { useAmityAuthState } from "../providers/AmityAuthProvider";

const disposers: Amity.Unsubscriber[] = [];
let isSubscribed = false;

const subscribePostTopic = (targetType: string, targetId: string) => {
  if (isSubscribed) return;

  if (targetType === "user") {
    const user = {} as Amity.User; // use getUser to get user by targetId
    disposers.push(
      subscribeTopic(getUserTopic(user, SubscriptionLevels.POST), () => {
        // use callback to handle errors with event subscription
      })
    );
    isSubscribed = true;
    return;
  }

  if (targetType === "community") {
    const community = {} as Amity.Community; // use getCommunity to get community by targetId
    disposers.push(
      subscribeTopic(
        getCommunityTopic(community, SubscriptionLevels.POST),
        () => {
          // use callback to handle errors with event subscription
        }
      )
    );
    isSubscribed = true;
  }
};

const useAmityPostsTopic = ({
  targetId,
  targetType,
}: {
  targetId: string;
  targetType: string;
}) => {
  const [posts, setPosts] = useState<Amity.Post[]>();
  const [hasMore, setHasMore] = useState<boolean>();
  const [onLoadMoreObj, setOnLoadMoreObj] = useState<any>({});

  const { isConnected } = useAmityAuthState();

  useEffect(() => {
    if (isConnected) {
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
        { targetId, targetType },
        ({ data: posts, onNextPage, hasNextPage, loading, error }) => {
          setPosts(posts);
          setHasMore(hasNextPage);
          setOnLoadMoreObj({ func: onNextPage });
          /*
           * this is only required if you want real time updates for each
           * community in the collection
           */
          subscribePostTopic(targetType, targetId);
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
  }, [isConnected]);

  return { posts, hasMore, onLoadMore: onLoadMoreObj.func };
};

export default useAmityPostsTopic;
