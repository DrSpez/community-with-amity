import { PostRepository } from "@amityco/ts-sdk";

const deletePost = async ({ postID }: { postID: string }) => {
  const hardDelete = await PostRepository.deletePost(postID, true);

  // const softDelete = await PostRepository.deletePost('postId');

  return hardDelete;
};

export default deletePost;
