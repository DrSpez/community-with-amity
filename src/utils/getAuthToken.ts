import { AMITY_SERVER_KEY } from "../config";

const getAmityAuthToken = async ({ userID }: { userID: string }) => {
  // TODO: in actual implementation this will happen on our own API protected via existing auth mechanism
  const res = await fetch(
    `https://api.us.amity.co/api/v3/authentication/token?userId=${userID}`,
    {
      headers: {
        "Content-Type": "application/json", // Adjust this as necessary
        "x-server-key": AMITY_SERVER_KEY,
      },
    }
  );
  const token = await res.json();
  return token;
};

export default getAmityAuthToken;
