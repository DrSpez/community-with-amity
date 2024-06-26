import { useCallback, useState } from "react";

import createTextPost from "../utils/createPost";

const PostCreator = ({ tags }: { tags: string[] }) => {
  const [text, setText] = useState<string>("");

  const questionText = "What will be your response?";
  const handleCreatePost = useCallback(async () => {
    if (text) {
      await createTextPost({ text, questionText, tags });
      setText("");
    }
  }, [text, tags]);
  return (
    <div className="space-top">
      <p className="white-text">
        Create post with tags: <br />
        {JSON.stringify(tags)}
      </p>
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
