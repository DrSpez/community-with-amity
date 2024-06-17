import { CommunityRepository } from "@amityco/ts-sdk";
import { useEffect, useState, useRef } from "react";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

interface Props {
  communityID: string;
}
const useAmityCommunity = ({ communityID }: Props) => {
  const { isConnected } = useAmityAuthState();
  const [response, setResponse] = useState<Amity.LiveObject<Amity.Community>>();
  let unsubscribeRef = useRef(() => {});

  useEffect(() => {
    if (isConnected) {
      unsubscribeRef.current = CommunityRepository.getCommunity(
        communityID,
        (response) => {
          setResponse(response);
        }
      );
      return () => {
        unsubscribeRef.current?.();
      };
    }
  }, [isConnected, communityID]);

  const { data, ...rest } = response || {};

  return { community: data, ...rest };
};

export default useAmityCommunity;
