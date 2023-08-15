import { createSlice } from "@reduxjs/toolkit";
import { setCredentialsUtil } from "../utils/auth.utils";

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
  reducers: { setCredentials: (state, action) => setCredentialsUtil(state, action) },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
