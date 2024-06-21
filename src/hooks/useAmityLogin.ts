import { useEffect, useState } from "react";

import { Client } from "@amityco/ts-sdk";
import getAmityAuthToken from "../utils/getAuthToken";

const useAmityLogin = ({
  userID,
  displayName,
}: {
  userID: string | number;
  displayName: string;
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    const getToken = async () => {
      const response = await getAmityAuthToken({ userID: String(userID) });
      setAuthToken(response);
      return response;
    };
    getToken();
  }, [userID]);

  useEffect(() => {
    if (authToken) {
      /*
       *  Check the session handler section in session state core concept for full details
       */
      const sessionHandler: Amity.SessionHandler = {
        sessionWillRenewAccessToken(renewal: Amity.AccessTokenRenewal) {
          // for details on other renewal methods check session handler
          renewal.renew();
        },
      };
      Client.login(
        {
          userId: String(userID),
          displayName, // optional
          authToken, // only required if using secure mode
        },
        sessionHandler
      ).then((res) => setIsConnected(res));
    }
  }, [authToken, displayName, userID]);

  return { authToken, isConnected };
};

export default useAmityLogin;
