import { AMITY_COMMUNITY_ID } from "../config";

const getFilteredPostCount = async ({
  accessToken,
  tags,
}: {
  accessToken: string;
  tags?: string[];
}) => {
  const basePath = "https://beta.amity.services/api/v3/search/posts";
  const url = tags
    ? `${basePath}?targetType=community&tags[]=${tags.join(",")}`
    : basePath;

  let data;
  try {
    const response = await fetch(url, {
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
