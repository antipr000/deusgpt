import * as admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { Plan } from "../domain/Plan";
import { serviceAccount } from "../../../deuse-firebase-admin";

const firebase_admin =
  getApps().length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : getApps()[0];

async function getUidFromIdToken(idToken) {
  const decodedToken = await firebase_admin.auth().verifyIdToken(idToken);
  return decodedToken.uid;
}

async function getUserFederatedData(idToken) {
  const uid = await getUidFromIdToken(idToken);
  const { email, displayName } = await firebase_admin.auth().getUser(uid);
  console.log("User info", email, displayName);
  return {
    firebaseId: uid,
    email: email,
    firstName:
      displayName && displayName !== "" ? displayName.split(" ")[0] : null,
    lastName:
      displayName && displayName !== "" ? displayName.split(" ")[1] : null,
    plan: Plan.STANDARD,
    createdAt: new Date(),
  };
}

async function createUserRecord({ email, password }) {
  const { uid } = await firebase_admin.auth().createUser({
    email: email,
    emailVerified: true,
    password: password,
  });

  return {
    firebaseId: uid,
    email,
    plan: Plan.STANDARD,
    createdAt: new Date(),
  };
}

async function resetUserPassword(email, password) {
  try {
    const user = await firebase_admin.auth().getUserByEmail(email.trim());
    const uid = user.uid;
    await firebase_admin.auth().updateUser(uid, {
      password,
    });
    return true;
  } catch (e) {
    console.log("Failed to set password for user", e);
    return false;
  }
}

export {
  firebase_admin,
  getUidFromIdToken,
  getUserFederatedData,
  createUserRecord,
  resetUserPassword,
};
