import { CommunityRepository, UserRepository } from "@amityco/ts-sdk";
import { useEffect, useState } from "react";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

const useAmityJoinCommunity = ( communityId: string) => {
  const [response, setResponse] = useState<boolean>();
  const { isConnected } = useAmityAuthState();

  let unsubscribe: () => void;

  async function joinCommunity() {
    const isJoined = await CommunityRepository.joinCommunity(communityId);

    setResponse(isJoined)
  }

  useEffect(() => {
    if (isConnected && communityId) {

      joinCommunity()
    }
  }, [isConnected]);


  return { isJoined: response };
};

export default useAmityJoinCommunity;
