import { UserRepository } from "@amityco/ts-sdk";
import { useEffect, useState } from "react";
import { useAmityAuthState } from "../providers/AmityAuthProvider";

const useAmityUser = () => {
  const [response, setResponse] = useState<Amity.LiveObject<Amity.User>>();
  const { isConnected, userID } = useAmityAuthState();

  let unsubscribe: () => void;

  useEffect(() => {
    if (isConnected) {
      unsubscribe = UserRepository.getUser(String(userID), (response) => {
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
