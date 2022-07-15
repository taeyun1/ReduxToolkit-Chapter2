import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();

  // console.log("postId", postId);

  // 게시물 ID 검색
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  // console.log("post", post);

  if (!post) {
    return (
      <section>
        <h2>게시물을 찾을 수 없습니다.</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;

// useSelector(state) 안에는 store에 있는 reducer값들이 있음 (posts, users)
// reducer {
//	posts : {
// 		posts : [{id, body, title...},{...},{...}..],
//		status: idle, // "succeeded" || "loding" || 등등,
// 		error: null,
// }
//  users : [{id, name, email...},{...},{...}..],
// }
// state.posts.posts[0] -> 0번째 게시물 가져옴
// state.users[0] -> 0번째 user정보 가져옴
