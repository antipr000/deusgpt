import axios from "axios";
import { store } from "./store/store";
import { idTokenAtom, loaderAtom, userAtom } from "./store";
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

async function getPaymentStatus(signal, paymentId) {
  const { data } = await instance.get(
    `/payment/confirm?signal=${signal}&paymentId=${paymentId}`
  );

  return data;
}

async function getUser() {
  const user = store.get(userAtom);
  if (!user) {
    try {
      const { data } = await instance.get("/user");
      store.set(userAtom, () => data);
      store.set(loaderAtom, () => ({ show: false, message: null }));
    } catch (err) {
      console.log("Here");
      await firebaseSignOut();
      store.set(loaderAtom, () => ({ show: false, message: null }));
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
