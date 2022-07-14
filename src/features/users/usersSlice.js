import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user데이터 api
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// user데이터 초기상태
const initialState = [];

// thunk로 가져오기
const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data; // 이 데이터는 fulfilled에 action.payload로 감
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // 비동기 작업이 성공하여 끝났을 때 상태
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload; // user API 반환
    });
  },
});

export const selectAllUsers = (state) => state.users;
export { fetchUsers };
export default usersSlice.reducer;
