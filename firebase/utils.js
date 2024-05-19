import { createUser, register } from "../api";
import firebase_app from "./config";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken(true);
  const user = await createUser(idToken);
  console.log(user);
}

export async function loginWithGithub() {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken(true);
  const user = await createUser(idToken);
  console.log(user);
}

export async function registerWithEmail(email, password, firstName, lastName) {
  const user = await register(email, password, firstName, lastName);
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken(true);
  console.log(user, idToken);
}

export async function loginWithEmail(email, password) {
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken(true);
  console.log(user, idToken);
}
