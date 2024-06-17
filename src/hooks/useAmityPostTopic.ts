import { PostRepository, subscribeTopic, getPostTopic } from "@amityco/ts-sdk";
import { useEffect, useState } from "react";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

const useAmityPostTopic = ({ postID }: { postID: string }) => {
  const [post, setPost] = useState<Amity.Post>();

  const { isConnected } = useAmityAuthState();

  const disposers: Amity.Unsubscriber[] = [];

  useEffect(() => {
    if (isConnected) {
      const unsubscribePost = PostRepository.getPost(postID, ({ data }) => {
        if (data) {
          /*
           * This step is important if you wish to recieve real time updates
           * Here, you are letting the server know that you wish to recieve real time
           * updates regarding this post
           */
          disposers.push(subscribeTopic(getPostTopic(data)));

          setPost(data);
        }
      });

      disposers.push(unsubscribePost);
    }
    return () => {
      disposers.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, [postID, isConnected]);

  return { post };
};

export default useAmityPostTopic;
