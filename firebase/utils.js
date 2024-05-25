import { createUser, getUser, register } from "../api";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { store } from "../store/store";
import { idTokenAtom, loaderAtom, userAtom } from "../store";
import firebase_app from "./config"; // Keep this import as it initializes firebase

export async function loginWithGoogle() {
  store.set(loaderAtom, () => ({ show: true, message: "Please wait" }));
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken(true);
  const user = await createUser(idToken);
  store.set(loaderAtom, () => ({ show: false, message: null }));
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function loginWithGithub() {
  store.set(loaderAtom, () => ({ show: true, message: "Please wait" }));
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken(true);
  const user = await createUser(idToken);
  store.set(loaderAtom, () => ({ show: false, message: null }));
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function registerWithEmail(email, password) {
  store.set(loaderAtom, () => ({ show: true, message: "Please wait" }));
  const user = await register(email, password);
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken(true);
  store.set(loaderAtom, () => ({ show: false, message: null }));
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function loginWithEmail(email, password) {
  store.set(loaderAtom, () => ({ show: true, message: "Please wait" }));
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken(true);
  const user = await getUser();
  store.set(loaderAtom, () => ({ show: false, message: null }));
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function resetPassword(email) {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}

export async function firebaseSignOut() {
  try {
    await signOut();
  } catch (e) {
    // pass
  }
  store.set(idTokenAtom, () => null);
  store.set(userAtom, () => null);
}
