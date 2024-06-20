import { ReactionRepository } from "@amityco/ts-sdk";
import { ReactableReference, ReactionType } from "../types";

const addReaction = async ({
  referenceType,
  referenceID,
  reactionType,
}: {
  referenceType: ReactableReference;
  referenceID: string;
  reactionType: ReactionType;
}) => {
  const isReactionAdded = await ReactionRepository.addReaction(
    referenceType,
    referenceID,
    reactionType
  );
  return isReactionAdded;
};

export default addReaction;
