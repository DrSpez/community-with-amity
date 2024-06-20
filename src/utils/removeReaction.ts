import { ReactionRepository } from "@amityco/ts-sdk";
import { ReactableReference, ReactionType } from "../types";

const removeReaction = async ({
  referenceType,
  referenceID,
  reactionType,
}: {
  referenceType: ReactableReference;
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
