import { CommentRepository } from "@amityco/ts-sdk";

const deleteComment = async ({
  commentID,
  hardDelete,
}: {
  commentID: string;
  hardDelete?: boolean;
}) => {
  const result = await CommentRepository.deleteComment(commentID, hardDelete);
  return result;
};

export default deleteComment;
