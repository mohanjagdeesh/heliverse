import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginPasswordVisibility: false,
  signupPasswordVisibility: false,
  profilePic: "",
  newUserProfilePic: "",
  searchValue: "",
  paginationCount: 0,
  userGender: "",
  userDomain: "",
  userAvailable: "",
  isLoading: true,
  updateUser: false,
  addUser: false,
  loader: false,
  updateUserDetails: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginVisibility: (state) => {
      state.loginPasswordVisibility = !state.loginPasswordVisibility;
    },
    signupVisibility: (state) => {
      state.signupPasswordVisibility = !state.signupPasswordVisibility;
    },
    setProfilePic: (state, { payload }) => {
      state.profilePic = payload;
    },
    setNewUserProfilePic: (state, { payload }) => {
      state.newUserProfilePic = payload;
    },
    searchQuery: (state, { payload }) => {
      state.searchValue = payload;
    },
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    increasePaginationCount: (state) => {
      state.paginationCount = state.paginationCount + 1;
    },
    decreasePaginationCount: (state) => {
      state.paginationCount = state.paginationCount - 1;
    },
    setUserGender: (state, { payload }) => {
      state.userGender = payload;
    },
    setUserDomain: (state, { payload }) => {
      state.userDomain = payload;
    },
    setUserAvailable: (state, { payload }) => {
      state.userAvailable = payload;
    },
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setUpdateUser: (state) => {
      state.updateUser = !state.updateUser;
    },
    setUpdateUserDetails: (state, { payload }) => {
      state.updateUserDetails = payload;
    },
    setAddUser: (state) => {
      state.addUser = !state.addUser;
    },
    setLoader: (state, { payload }) => {
      state.loader = payload;
    },
    setInitialState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addUserDetails,
  loginVisibility,
  signupVisibility,
  setProfilePic,
  searchQuery,
  setDataUsers,
  setSearchValue,
  increasePaginationCount,
  decreasePaginationCount,
  setUserAvailable,
  setUserDomain,
  setUserGender,
  setIsLoading,
  setUpdateUser,
  setUpdateUserDetails,
  setAddUser,
  setNewUserProfilePic,
  setLoader,
  setInitialState,
} = usersSlice.actions;

export default usersSlice.reducer;
