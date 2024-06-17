import { useState } from "react";

import createComment from "../utils/createComment";

const CommentCreator = ({ postID }: { postID: string }) => {
  const [text, setText] = useState<string>("");
  const handleCreateComment = async () => {
    if (text) {
      await createComment({ text, postID });
      setText("");
    }
  };
  return (
    <div className="space-top">
      <input
        type="text"
        placeholder="Add comment"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button onClick={handleCreateComment}>Submit</button>
    </div>
  );
};

export default CommentCreator;
