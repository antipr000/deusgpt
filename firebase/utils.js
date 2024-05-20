import { createUser, register } from "../api";
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
import { idTokenAtom, userAtom } from "../store";
import firebase_app from "./config"; // Keep this import as it initializes firebase

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken(true);
  const user = await createUser(idToken);
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function loginWithGithub() {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken(true);
  const user = await createUser(idToken);
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function registerWithEmail(email, password) {
  const user = await register(email, password);
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken(true);
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function loginWithEmail(email, password) {
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken(true);
  store.set(idTokenAtom, () => idToken);
  store.set(userAtom, () => user);
}

export async function resetPassword(email) {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}

export async function firebaseSignOut() {
  await signOut();
}
