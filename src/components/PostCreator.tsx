import { useCallback, useState } from "react";

import createTextPost from "../utils/createPost";

const PostCreator = ({ userID, tags }: { userID: string; tags: string[] }) => {
  const [text, setText] = useState<string>();
  const handleCreatePost = useCallback(() => {
    if (text) {
      createTextPost({ text, tags });
    }
  }, [text]);
  return (
    <div className="space-top">
      <p className="white-text">Create post:</p>
      <input
        className="space-left"
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      {text && (
        <button className="space-left" onClick={handleCreatePost}>
          Submit
        </button>
      )}
    </div>
  );
};

export default PostCreator;
