const getFilteredPostCount = async ({
  authToken,
  tags,
}: {
  authToken: string;
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
        Authorization: authToken,
      },
    });
    data = await response.json();
  } catch (err) {
    console.error(err);
  }
  console.log("!! beta api /search/posts", { authToken, url, data });
  return -1;
};

export default getFilteredPostCount;
