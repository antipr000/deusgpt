import { NextResponse } from "next/server";
import UserRepository from "../db/repositories/User.repository";
import { createUserRecord } from "../firebase/utils";

export async function POST(request) {
  const requestBody = await request.json();
  const data = await createUserRecord(requestBody);
  const userRepository = new UserRepository();
  const userData = await userRepository.createNewUser(data);
  return NextResponse.json(userData);
}
