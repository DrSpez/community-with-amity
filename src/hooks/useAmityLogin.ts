import { useEffect, useState } from "react";

import { Client } from "@amityco/ts-sdk";

const useAmityLogin = ({
  userID,
  displayName,
}: {
  userID: string | number;
  displayName: string;
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
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
        // authToken: AMITY_AUTH_TOKEN, // only required if using secure mode
      },
      sessionHandler
    ).then((res) => setIsConnected(res));
  }, [displayName, userID]);

  return { isConnected };
};

export default useAmityLogin;
