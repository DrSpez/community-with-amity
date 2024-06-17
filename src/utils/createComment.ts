import { CommentRepository } from "@amityco/ts-sdk";

/*
 * Possible params for createComment:
 * referenceId: 'postId' | 'storyId';
 * referenceType: 'post' | 'content' | 'story';
 * data?: { text: string };   // this field is required when attachment field is empty
 * parentId?: 'commentId';    // replay to a comment
 * metadata?: {};
 * attachments?: [{ type: "image", fileId: "file_id_1" }, { type: "image", fileId: "file_id_2" }];
 * mentionees?: [{"type": "user", "userIds": [ "userId1", "userId2" ]}];
 */

const createComment = async ({
  text,
  postID,
}: {
  text: string;
  postID: string;
}) => {
  const newComment = {
    /**
     * Notice:
     * `data` and `attachments` are optional, but in `createComment` / `updateComment` it's required at lease 1 field to be set
     * it cannot be empty both
     */
    data: {
      text,
    },
    // attachments: [
    //   { type: "image" as Amity.Attachment["type"], fileId: "file_id_1" },
    //   { type: "image" as Amity.Attachment["type"], fileId: "file_id_2" },
    // ],
    referenceId: postID,
    referenceType: "post" as Amity.CommentReferenceType, // 'content' | 'post' | 'story'
  };

  const { data: comment } = await CommentRepository.createComment(newComment);

  return comment;
};

export default createComment;
