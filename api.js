import axios from "axios";
import { v4 } from "uuid";
import { store } from "./store/store";
import { idTokenAtom, loaderAtom, userAtom } from "./store";
import { firebaseSignOut } from "./firebase/utils";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
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

async function getAllPaymentsForUser() {
  const { data } = await instance.get("/payment");
  return data;
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
      return data;
    } catch (err) {
      console.log("Here");
      await firebaseSignOut();
      store.set(loaderAtom, () => ({ show: false, message: null }));
      return null;
    }
  }
}

async function updateUser(body) {
  const { data } = await instance.patch("/user", body);
  store.set(userAtom, () => data);
  return data;
}

async function forgotPassword(email) {
  const { data } = await instance.post("/auth/password/forgot", {
    email,
  });

  return data.success;
}

async function verifyOtp(email, otp) {
  const { data } = await instance.post("/auth/password/verify", {
    email,
    otp,
  });

  return data;
}

async function resetPassword(email, password) {
  const { data } = await instance.post("/auth/password/reset", {
    email,
    password,
  });

  return data.success;
}

async function getAllIntegrations() {
  const { data } = await instance.get("/integrations");
  return data;
}

const getAllChatSessions = async (user) => {
  const { data } = await instance.get("/chat-session");
  if (!data?.length) {
    const newSession = await createChatSession({
      agent: "gpt",
      createdAt: new Date(),
      firebaseId: user.firebaseId,
      name: "DeusGPT",
      sessionId: v4(),
    });
    return [newSession];
  }
  return data;
};

const createChatSession = async (request) => {
  const { data } = await instance.post("/chat-session", request);
  return data;
};

export {
  createUser,
  register,
  generateStripeSessionToken,
  getPaymentStatus,
  getUser,
  updateUser,
  getAllPaymentsForUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getAllIntegrations,
  getAllChatSessions,
  createChatSession,
};
