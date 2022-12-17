export const auth = localStorage.getItem("auth");

export const setAuthToken = (token) => localStorage.setItem("auth", token);
export const setRefreshToken = (token) =>
  localStorage.setItem("refresh_token", token);
