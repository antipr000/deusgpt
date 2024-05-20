import axios from "axios";
import { store } from "./store/store";
import { idTokenAtom, userAtom } from "./store";
import { firebaseSignOut } from "./firebase/utils";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use((config) => {
  const idToken = store.get(idTokenAtom);
  console.log("ID token", idToken);
  if (idToken) {
    config.headers.Authorization = idToken;
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

async function generateStripeSessionToken(price, plan, idempotencyKey) {
  const { data } = await instance.post("/payment", {
    price,
    plan,
    idempotencyKey,
  });
  return data.sessionId;
}

async function getPaymentStatus(sessionId) {
  await instance.get(`/payment/confirm?sessionId=${sessionId}`);
}

async function getUser() {
  const user = store.get(userAtom);
  if (!user) {
    try {
      const { data } = await instance.get("/user");
      store.set(userAtom, () => data);
    } catch (err) {
      await firebaseSignOut();
      store.set(idTokenAtom, () => null);
      store.set(userAtom, () => null);
    }
  }
}

async function updateUser(body) {
  const { data } = await instance.patch("/user", body);
  return data;
}

export {
  createUser,
  register,
  generateStripeSessionToken,
  getPaymentStatus,
  getUser,
  updateUser,
};
