import { BASE_URL } from "./constant";
import { auth } from "./localStorage";
import jwt_decode from "jwt-decode";

let originalRequest = async (url, config) => {
  url = `${BASE_URL}${url}`;
  let response = await fetch(url, config);
  let data = await response.json();
  console.log("REQUESTING:", data);
  return { response, data };
};

let refreshToken = async () => {
  let response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("auth"),
    },
  });
  let data = await response.json();
  localStorage.setItem("auth", JSON.stringify(data));
  return data;
};

let customFetcher = async (url, config = {}) => {
  let authTokens = localStorage.getItem("auth")
    ? localStorage.getItem("auth")
    : null;

  //Proceed with request

  config["headers"] = {
    Authorization: `Bearer ${authTokens}`,
  };

  console.log("Before Request");
  let { response, data } = await originalRequest(url, config);

  console.log("After Request");

  if (jwt_decode(localStorage.getItem("auth")).exp < 3000) {
    authTokens = await refreshToken(authTokens);

    config["headers"] = {
      Authorization: `Bearer ${auth}`,
    };

    let newResponse = await originalRequest(url, config);

    response = newResponse.response;
    data = newResponse.data.nodes;
  }
  return { response, data };
};
export default customFetcher;
