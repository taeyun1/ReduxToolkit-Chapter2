import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "๐",
  wow: "๐ฎ",
  heart: "โค๏ธ",
  rocket: "๐",
  coffee: "โ",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  // Object.entries() ๋ฉ์๋๋ for in์ ๊ฐ์ ์์๋ก ์ฃผ์ด์ง ๊ฐ์ฒด ์์ฒด์ enumerable ์์ฑ [key, value] ์์ ๋ฐฐ์ด์ ๋ฐํ
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButtons;
