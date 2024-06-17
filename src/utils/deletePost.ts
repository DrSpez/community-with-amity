import { PostRepository } from "@amityco/ts-sdk";

const deletePost = async ({
  postID,
  hardDelete,
}: {
  postID: string;
  hardDelete?: boolean;
}) => {
  const result = await PostRepository.deletePost(postID, hardDelete);
  return result;
};

export default deletePost;
