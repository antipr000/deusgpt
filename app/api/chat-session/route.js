import { NextResponse } from "next/server";
import ChatRepository from "../db/repositories/ChatSession.repository";
import { getUserFederatedData } from "../firebase/utils";
import { getIDTokenFromRequest } from "../utils";

export async function GET(request) {
  const idToken = getIDTokenFromRequest(request);

  if (!idToken) {
    return NextResponse.json({}, { status: 401 });
  }
  const user = await getUserFederatedData(idToken);

  const chatRepository = new ChatRepository();
  const data = await chatRepository.getAllChatSessions(user.firebaseId);
  return NextResponse.json(data);
}

export async function POST(request) {
  const idToken = getIDTokenFromRequest(request);

  if (!idToken) {
    return NextResponse.json({}, { status: 401 });
  }
  const user = await getUserFederatedData(idToken);

  const body = await request.json();
  body.firebaseId = user.firebaseId;
  const chatRepository = new ChatRepository();
  const session = await chatRepository.createChatSession(body);
  return NextResponse.json(session);
}
