import { AMITY_COMMUNITY_ID } from "../config";

const getFilteredPostCount = async ({
  accessToken,
  tags,
}: {
  accessToken: string;
  tags: string[];
}) => {
  let data;
  try {
    const response = await fetch(
      `https://beta.amity.services/api/v3/search/posts?targetType=community&targetIds[]=${AMITY_COMMUNITY_ID}&tags[]=${tags.join(
        ","
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    data = await response.json();
  } catch (err) {
    console.error(err);
  }
  return data.found;
};

export default getFilteredPostCount;
