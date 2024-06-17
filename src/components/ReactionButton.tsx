import React from "react";

import addReactionToPost from "../utils/addReactionToPost";
import removeReactionFromPost from "../utils/removeReactionFromPost";
import { ReactionType } from "../types";

const ReactionButton = ({
  post,
  reactionType,
}: {
  post: Amity.Post;
  reactionType: ReactionType;
}) => {
  const postID = post._id;
  const likeDone = post.myReactions.includes(reactionType);
  const buttonText = likeDone
    ? `Un${reactionType}`
    : reactionType.charAt(0).toUpperCase() + reactionType.slice(1);
  return (
    <button
      onClick={() => {
        (likeDone ? removeReactionFromPost : addReactionToPost)({
          postID,
          reactionType,
        });
      }}
    >
      {buttonText}
    </button>
  );
};

export default ReactionButton;
