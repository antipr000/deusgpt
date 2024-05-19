import axios from "axios";
import { store } from "./store/store";
import { idTokenAtom } from "./store";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use((config) => {
  const idToken = store.get(idTokenAtom);
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }
  return config;
});

async function createUser(idToken) {
  const { data } = await instance.post("/user", { idToken });
  return data;
}

async function register(email, password) {
  const { data } = await instance.post("/register", {
    email,
    password,
  });
  return data;
}

export { createUser, register };
