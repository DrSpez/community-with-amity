import { ReactionRepository } from "@amityco/ts-sdk";

const removeReactionFromPost = async ({
  postID,
  reactionType,
}: {
  postID: string;
  reactionType: "like";
}) => {
  const isPostReactionRemoved = await ReactionRepository.removeReaction(
    "post",
    postID,
    reactionType
  );
  return isPostReactionRemoved;
};

export default removeReactionFromPost;
