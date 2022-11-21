import * as api from "./api.js";

const endpoints = {
  register: "users/register",
  login: "users/login",
  logout: "users/logout",
};

export async function login(email, password) {
  const response = await api.post(endpoints.login, { email, password });
  localStorage.setItem("user", JSON.stringify(await response));

  return response;
}
export async function register(email, password) {
  const response = await api.post(endpoints.register, { email, password });
  localStorage.setItem("user", JSON.stringify(await response));
  return response;
}

export async function logout() {
  const response = await api.get(endpoints.logout);
  localStorage.removeItem("user");
  return response;
}
