import { useEffect, useState } from "react";

import { Client, API_REGIONS } from "@amityco/ts-sdk";

import getFilteredPostCount from "../utils/getFilteredPostCount";
import { AMITY_API_KEY } from "../config";

const useAmityPostCount = ({ tags }: { tags: string[] }) => {
  const [postCount, setPostCount] = useState<number>();
  const { token: { accessToken } = {} } = Client.createClient(
    AMITY_API_KEY,
    API_REGIONS.US
  );

  useEffect(() => {
    if (accessToken) {
      const getCounts = async () => {
        const count = await getFilteredPostCount({
          accessToken,
          tags,
        });
        setPostCount(count);
      };
      getCounts();
    }
  }, [accessToken, tags]);
  return postCount;
};

export default useAmityPostCount;
