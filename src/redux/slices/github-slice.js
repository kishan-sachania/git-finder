import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  UserRepositoryList: [],
  SearchUser: {},
  UserSearchHistory: [],
};

const githubSlice = createSlice({
  name: "githubslice",
  initialState: INITIAL_STATE,
  reducers: {
    setFetchUserRepositoryList: (state, action) => {
      state.UserRepositoryList = [...action.payload];
    },
    setSearchHistory: (state, action) => {
      const exists = state.UserSearchHistory.some(
        (user) =>
          user.login.toLowerCase() === action.payload.login.toLowerCase()
      );
      if (!exists) {
        state.UserSearchHistory.push(action.payload);
      }
    },
    setSearchUser: (state, action) => {
      state.SearchUser = action.payload;
    },
    deleteUserSearchHistory: (state) => {
    
      state.UserSearchHistory = [];
    }, // Resetting the search history to an empty array
  },
});
export const {
  setFetchUserRepositoryList,
  setSearchUser,
  setSearchHistory,
  deleteUserSearchHistory,
} = githubSlice.actions;
export default githubSlice.reducer;
