import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { Link } from "react-router-dom";

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      {post.title.substring(0, 15).length === 15 ? (
        <h2 className="title">{post.title.substring(0, 10)}...</h2>
      ) : (
        <h2 className="title">{post.title.substring(0, 10)}</h2>
      )}
      {/* <h2 className="title">...</h2> */}
      <p className="excerpt">{post.body.substring(0, 70)}...</p>{" "}
      {/*substring() 글자수 0~70개 까지 설정 */}
      <p className="postCredit">
        <Link className="link" to={`post/${post.id}`}>
          View Post{" "}
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
export default PostsExcerpt;
