import { ReactionRepository } from "@amityco/ts-sdk";
import { ReactableReferenceType, ReactionType } from "../types";

const removeReaction = async ({
  referenceType,
  referenceID,
  reactionType,
}: {
  referenceType: ReactableReferenceType;
  referenceID: string;
  reactionType: ReactionType;
}) => {
  const isReactionRemoved = await ReactionRepository.removeReaction(
    referenceType,
    referenceID,
    reactionType
  );
  return isReactionRemoved;
};

export default removeReaction;
