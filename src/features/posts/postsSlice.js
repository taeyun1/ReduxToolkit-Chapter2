import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// 비동기 썬크 사용하여 API가져오기
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  const response = await axios.post(POSTS_URL, initialPost);
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    // 버튼 클릭 시 postId: post.id와 reaction: name을 보냄
    reactionAdded(state, action) {
      // 받은 post.id와 reaction: name을 postId와 reaction에 할당
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);

      // 게시물을 찾을경우 기존 게시글에 reactions[받은name]을 +1 증가시킴
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      // 비동기 작업을 시작했을 때 상태
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      // 비동기 작업이 성공하여 끝났을 때 상태
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Adding date and reactions(날짜 및 반응 추가)
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array (가져온 게시물을 배열에 추가)
        state.posts = state.posts.concat(loadedPosts);
      })
      // 비동기 작업중 오류가 생겨 중단 됐을 때
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // 새 게시물 저장시 추가 할 유저 오브젝트
      .addCase(addNewPost.fulfilled, (state, action) => {
        // 저장버튼 누를시 userId와
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export { fetchPosts, addNewPost };
export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
