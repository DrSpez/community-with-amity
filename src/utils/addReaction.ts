import { ReactionRepository } from "@amityco/ts-sdk";
import { ReactableReferenceType, ReactionType } from "../types";

const addReaction = async ({
  referenceType,
  referenceID,
  reactionType,
}: {
  referenceType: ReactableReferenceType;
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
