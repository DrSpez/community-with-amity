import { createContext, useContext, useEffect, useState } from "react";
import useAmityLogin from "../hooks/useAmityLogin";

interface AmityAuthState {
  userID: string | undefined;
  displayName: string | undefined;
  isConnected: boolean;
}

const AmityAuthContext = createContext<AmityAuthState>({
  userID: undefined,
  displayName: undefined,
  isConnected: false,
});

const AmityAuthProvider = ({ children }: { children: React.ReactElement }) => {
  // const userID = "test-user-1";
  // const displayName = "Test User One";
  const userID = "other-user";
  const displayName = "Other Test User";
  const { isConnected } = useAmityLogin({ userID, displayName });

  const [state, setState] = useState<AmityAuthState>({
    userID,
    displayName,
    isConnected,
  });

  useEffect(() => {
    setState({ ...state, isConnected });
  }, [isConnected]);

  return (
    <AmityAuthContext.Provider value={state}>
      {children}
    </AmityAuthContext.Provider>
  );
};

export const useAmityAuthState = () => useContext(AmityAuthContext);

export default AmityAuthProvider;
