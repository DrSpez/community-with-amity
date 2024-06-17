import { ReactionRepository } from "@amityco/ts-sdk";

import { ReactionType } from "../types";

const addReactionToPost = async ({
  postID,
  reactionType,
}: {
  postID: string;
  reactionType: ReactionType;
}) => {
  const isPostReactionAdded = await ReactionRepository.addReaction(
    "post",
    postID,
    reactionType
  );
  return isPostReactionAdded;
};

export default addReactionToPost;
