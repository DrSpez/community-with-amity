import React from "react";

import addReaction from "../utils/addReaction";
import removeReaction from "../utils/removeReaction";
import { ReactableReferenceType, ReactionType } from "../types";

const ReactionButton = ({
  referenceID,
  referenceType,
  myReactions,
  reactionType,
}: {
  referenceID: string;
  referenceType: ReactableReferenceType;
  myReactions: string[] | undefined;
  reactionType: ReactionType;
}) => {
  const likeDone = myReactions?.includes(reactionType);
  const buttonText = likeDone
    ? `Un${reactionType}`
    : reactionType.charAt(0).toUpperCase() + reactionType.slice(1);
  return (
    <button
      onClick={() => {
        (likeDone ? removeReaction : addReaction)({
          referenceID,
          referenceType,
          reactionType,
        });
      }}
    >
      {buttonText}
    </button>
  );
};

export default ReactionButton;
