const getFilteredPostCount = async ({ userID }: { userID: string }) => {
  const response = await fetch(
    "https://beta.amity.services/api/v3/search/posts",
    {
      method: "GET",
      headers: {},
    }
  );
  const data = await response.json();

  console.log("!! search", userID, data);
  return 1;
};

export default getFilteredPostCount;
