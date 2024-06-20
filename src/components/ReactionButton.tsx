import React, { useState } from "react";

import addReaction from "../utils/addReaction";
import removeReaction from "../utils/removeReaction";
import { ReactableReference, ReactionType } from "../types";

const ReactionButton = ({
  referenceID,
  referenceType,
  myReactions,
  reactionType,
}: {
  referenceID: string;
  referenceType: ReactableReference;
  myReactions: string[] | undefined;
  reactionType: ReactionType;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const likeDone = myReactions?.includes(reactionType);
  const buttonText = likeDone
    ? `Un${reactionType}`
    : reactionType.charAt(0).toUpperCase() + reactionType.slice(1);
  return (
    <button
      onClick={async () => {
        if (!isLoading) {
          setIsLoading(true);
          await (likeDone ? removeReaction : addReaction)({
            referenceID,
            referenceType,
            reactionType,
          });
          setIsLoading(false);
        }
      }}
      disabled={isLoading}
    >
      {buttonText}
    </button>
  );
};

export default ReactionButton;
