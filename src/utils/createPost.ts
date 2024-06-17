import { PostRepository } from "@amityco/ts-sdk";

import { AMITY_COMMUNITY_ID } from "../config";

const createTextPost = async ({
  text,
  tags,
}: {
  text: string;
  tags?: string[];
}) => {
  const newPost = {
    tags,
    data: {
      text,
    },
    targetType: "community",
    targetId: AMITY_COMMUNITY_ID,
  };

  const { data: post } = await PostRepository.createPost(newPost);

  return post;
};

export default createTextPost;
