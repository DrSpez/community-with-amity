import { createContext, useContext } from "react";

import useAmityLogin from "../hooks/useAmityLogin";
import useAmityJoinCommunity from "../hooks/useAmityJoinCommunity";
import { AMITY_COMMUNITY_ID } from "../config";

interface AmityAuthState {
  userID: string | undefined;
  displayName: string | undefined;
  isConnected: boolean;
  isJoinedCommunity: boolean;
}

const initialState: AmityAuthState = {
  userID: undefined,
  displayName: undefined,
  isConnected: false,
  isJoinedCommunity: false,
};
const AmityAuthContext = createContext<AmityAuthState>(initialState);

const AmityAuthProvider = ({ children }: { children: React.ReactElement }) => {
  // const userID = "test-user-1";
  // const displayName = "Test User One";
  // const userID = "other-user";
  // const displayName = "Other Test User";

  const userID = "third-user";
  const displayName = "Third Test User";
  const { isConnected } = useAmityLogin({ userID, displayName });
  // Join community automatically
  const { isJoinedCommunity } = useAmityJoinCommunity({
    isConnected,
    communityID: AMITY_COMMUNITY_ID,
  });

  return (
    <AmityAuthContext.Provider
      value={{
        userID,
        displayName,
        isConnected,
        isJoinedCommunity,
      }}
    >
      {children}
    </AmityAuthContext.Provider>
  );
};

export const useAmityAuthState = () => useContext(AmityAuthContext);

export default AmityAuthProvider;
