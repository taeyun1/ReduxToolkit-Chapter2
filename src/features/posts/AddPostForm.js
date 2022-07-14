import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // title, content, userId가 모두 Boolean값이 참이고, addRequestStatus가 idle이면 할당
  // 즉, 폼 작성을 다해야 저장버튼이 활성화됨
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  // 리팩토링
  // 저장 버튼 누를시 실행
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  /* 
	★ 디스패치된 thunk가 반환한 이행된 프로미스는 unwrap() 프로퍼티를 가지고 있는데, 이를 사용해서 오류 처리를 할 수 있다.
		▶ 이 방식은 액션을 디스패치한 컴포넌트 내부에서 오류를 처리한다.
		▶ 각각의 컴포넌트가 서로 다른 방식으로 오류를 처리할 수 있다는 장점이 있다.
	참고 URL : https://velog.io/@raejoonee/createAsyncThunk
	*/
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
