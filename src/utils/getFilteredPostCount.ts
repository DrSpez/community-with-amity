const getFilteredPostCount = async ({
  accessToken,
  tags,
}: {
  accessToken: string;
  tags?: string[];
}) => {
  const basePath = "https://beta.amity.services/api/v3/search/posts";
  const url = `${basePath}?targetType=community&tags[]${ tags && tags?.length > 0 ? '='+tags?.join(',') : ''}`

  console.log('url: ', url);
  let data;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    data = await response.json();
    console.log('data: ', data);
  } catch (err) {
    console.error(err);
  }
  console.log("!! beta api /search/posts", { accessToken, url, data });
  return -1;
};

export default getFilteredPostCount;
