import { createSlice } from "@reduxjs/toolkit";
import { setCredentialsUtil, clearCredentialsUtil } from "../utils/auth.utils";

interface IInitialState {
  userInfo: any;
}

const getUserInfoFromLocalStorage = (): string | null => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const initialState: IInitialState = {
  userInfo: getUserInfoFromLocalStorage(),
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => setCredentialsUtil(state, action),
    clearCredentials: (state) => clearCredentialsUtil(state),
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
