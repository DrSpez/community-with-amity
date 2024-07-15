import { AMITY_COMMUNITY_ID } from "../config";

const getFilteredPostCount = async ({
  accessToken,
  tags,
}: {
  accessToken: string;
  tags: string[];
}) => {
  let data;
  const searchURL = `https://beta.amity.services/api/v3/search/posts?targetType=community&targetIds[]=${AMITY_COMMUNITY_ID}&tags[]=${tags.join(
    ","
  )}`;

  try {
    const response = await fetch(searchURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    data = await response.json();
  } catch (err) {
    console.error(err);
  }
  return data.found;
};

export default getFilteredPostCount;
