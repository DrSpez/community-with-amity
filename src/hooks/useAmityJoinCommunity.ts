import { useCallback, useEffect, useState } from "react";

import joinCommunity from "../utils/joinCommunity";

const useAmityJoinCommunity = ({
  isConnected,
  communityID,
}: {
  isConnected: boolean;
  communityID: string;
}) => {
  const [isJoinedCommunity, setIsJoinedCommunity] = useState<boolean>(false);

  const joinCommunityCallback = useCallback(async () => {
    const isSuccess = await joinCommunity({ communityID });
    setIsJoinedCommunity(isSuccess);
  }, [communityID]);

  useEffect(() => {
    if (isConnected) {
      joinCommunityCallback();
    }
  }, [isConnected]);

  return { isJoinedCommunity };
};

export default useAmityJoinCommunity;
