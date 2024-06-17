import {
  CommentRepository,
  getCommunityTopic,
  getUserTopic,
  subscribeTopic,
  SubscriptionLevels,
} from "@amityco/ts-sdk";
import { useEffect, useState } from "react";
import { AMITY_COMMUNITY_ID } from "../config";
import useAmityCommunity from "./useAmityCommunity";
import useAmityUser from "./useAmityUser";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

const disposers: Amity.Unsubscriber[] = [];
let isSubscribed = false;

const subscribeCommentTopic = (
  referenceId: string,
  targetType: "user" | "community",
  user: Amity.User,
  community: Amity.Community
) => {
  if (isSubscribed) return;

  if (targetType === "user") {
    // const user = {} as Amity.User; // use getUser to get user by targetId
    disposers.push(
      subscribeTopic(getUserTopic(user, SubscriptionLevels.COMMENT), () => {
        // use callback to handle errors with event subscription
      })
    );
    isSubscribed = true;
    return;
  }

  if (targetType === "community") {
    // const community = {} as Amity.Community; // use getCommunity to get community by targetId
    disposers.push(
      subscribeTopic(
        getCommunityTopic(community, SubscriptionLevels.COMMENT),
        () => {
          // use callback to handle errors with event subscription
        }
      )
    );
    isSubscribed = true;
  }
};

const useAmityCommentsTopic = ({ postID }: { postID: string }) => {
  const [commentsData, setCommentsData] = useState<Amity.InternalComment[]>();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [onLoadMoreObj, setOnLoadMoreObj] = useState<{
    onLoadMore: (() => void) | undefined;
  }>({
    onLoadMore: () => alert("DEFAULT! Should never happen"),
  });

  const { isConnected, userID } = useAmityAuthState();
  const { user } = useAmityUser({ userID });
  const { community } = useAmityCommunity({ communityID: AMITY_COMMUNITY_ID });

  useEffect(() => {
    if (isConnected && user && community) {
      /*
       * Possible params for CommentRepository.getComments:
       * referenceType: 'post' | 'content';
       * referenceId: 'postId';
       * sortBy?: 'lastCreated' | 'firstCreated' | 'lastUpdated' | 'firstUpdated';
       * hasFlag?: boolean;
       * isDeleted?: boolean;
       * parentId?: 'commentId';
       * page?: { limit: 10 };
       * dataTypes: {
       *  values: ['image', 'text'];
       *  matchType: any | exact;
       * };
       */

      /**
       * ------------------------
       * Query only comments which contain only image
       * ------------------------
       * {
       *  referenceType: 'post',
       *  referenceId: 'postId',
       *  dataTypes: {
       *     values: ['image'],
       *     matchType: 'exact',
       *  }
       * }
       *
       * ------------------------
       * Query only comments which contain image and text
       * ------------------------
       * {
       *  referenceType: 'post',
       *  referenceId: 'postId',
       *  dataTypes: {
       *     values: ['image', 'text'],
       *     matchType: 'exact',
       *  }
       * }
       *
       * ------------------------
       * Query all comments which contain image OR text
       * ------------------------
       * {
       *  referenceType: 'post',
       *  referenceId: 'postId',
       *  dataTypes: {
       *     values: ['image', 'text'],
       *     matchType: 'any',
       *  }
       * }
       *
       * ------------------------
       * Query all comments which must contain image, text is optional
       * ------------------------
       * {
       *  referenceType: 'post',
       *  referenceId: 'postId',
       *  dataTypes: {
       *     values: ['image'],
       *     matchType: 'any',
       *  }
       * }
       *
       * ------------------------
       * Query all comments which must contain text, image is optional
       * ------------------------
       * {
       *  referenceType: 'post',
       *  referenceId: 'postId',
       *  dataTypes: {
       *     values: ['text'],
       *     matchType: 'any',
       *  }
       * }
       */
      const textOnlyParam: Amity.CommentLiveCollection = {
        referenceType: "post",
        referenceId: postID,
        dataTypes: {
          values: ["text"],
          matchType: "exact",
        },
        limit: 5,
      };

      const unsubscribe = CommentRepository.getComments(
        textOnlyParam,
        ({ data: comments, onNextPage, hasNextPage, loading, error }) => {
          setCommentsData(comments);
          setHasMore(hasNextPage || false);
          setOnLoadMoreObj({ onLoadMore: onNextPage });
          /*
           * this is only required if you want real time updates for each
           * community in the collection
           */
          subscribeCommentTopic(postID, "community", user, community); // FIXME: should this be communityID? Docs have postID - typo?
        }
      );

      /*
       * if you only wish to get a collection or list of paginated comments without
       * any real time updates you can unsubscribe immediately after you call the
       * collection.
       * ex: unsubscribe()
       */
      disposers.push(unsubscribe);
    }
    return () => {
      disposers.forEach((fn) => fn());
    };
  }, [isConnected, user, community, postID]);

  return {
    comments: commentsData,
    hasMore,
    onLoadMore: onLoadMoreObj?.onLoadMore,
  };
};

export default useAmityCommentsTopic;
