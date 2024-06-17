import { UserRepository } from "@amityco/ts-sdk";
import { useEffect, useState } from "react";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

const useAmityUser = ({ userID }: { userID: string | undefined }) => {
  const [response, setResponse] = useState<Amity.LiveObject<Amity.User>>();
  const { isConnected } = useAmityAuthState();

  let unsubscribe: () => void;

  useEffect(() => {
    if (isConnected && userID) {
      unsubscribe = UserRepository.getUser(userID, (response) => {
        setResponse(response);
      });
      return () => {
        unsubscribe?.();
      };
    }
  }, [isConnected, userID]);

  const { data, ...rest } = response || {};

  return { user: data, ...rest };
};

export default useAmityUser;
