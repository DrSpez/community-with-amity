import { CommunityRepository } from "@amityco/ts-sdk";

const joinCommunity = async ({ communityID }: { communityID: string }) => {
  const isJoined = await CommunityRepository.joinCommunity(communityID);
  return isJoined;
};

export default joinCommunity;
