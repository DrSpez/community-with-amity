import { PostRepository } from "@amityco/ts-sdk";

import { AMITY_COMMUNITY_ID } from "../config";

const createTextPost = async ({
  text,
  questionText,
  tags,
}: {
  text: string;
  questionText: string;
  tags?: string[];
}) => {
  const newPost = {
    tags,
    data: {
      text,
    },
    targetType: "community",
    targetId: AMITY_COMMUNITY_ID,
    metaData: {
      questionText,
    },
  };

  const { data: post } = await PostRepository.createPost(newPost);

  return post;
};

export default createTextPost;
