export const setCredentialsUtil = (state: any, action: any) => {
  state.userInfo = action.payload;
  localStorage.setItem("userInfo", JSON.stringify(action.payload));
};
