import { NextResponse } from "next/server";
import UserRepository from "../db/repositories/User.repository";
import { getUidFromIdToken, getUserFederatedData } from "../firebase/utils";
import { getIDTokenFromRequest } from "../utils";

export async function POST(request) {
  const requestBody = await request.json();
  const idToken = requestBody["idToken"];
  const data = await getUserFederatedData(idToken);
  const userRepository = new UserRepository();
  const record = await userRepository.getUserByFirebaseId(data.firebaseId);
  if (record) return NextResponse.json(record);
  const userData = await userRepository.createNewUser(data);
  return NextResponse.json(userData);
}

export async function GET(request) {
  const idToken = getIDTokenFromRequest(request);
  const firebaseId = await getUidFromIdToken(idToken);
  const userRepository = new UserRepository();
  const userData = await userRepository.getUserByFirebaseId(firebaseId);
  return NextResponse.json(userData);
}

export async function PATCH(request) {
  const requestBody = await request.json();
  const idToken = getIDTokenFromRequest(request);
  const firebaseId = await getUidFromIdToken(idToken);
  const userRepository = new UserRepository();
  const userData = await userRepository.updateUser(firebaseId, requestBody);
  return NextResponse.json(userData);
}
