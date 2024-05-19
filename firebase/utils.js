import { createUser } from "../api";
import firebase_app from "./config";
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken(true);
    const user = await createUser(idToken);
    console.log(user);
}