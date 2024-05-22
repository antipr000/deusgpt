import { getIDTokenFromRequest } from "../utils";
import { getUserFederatedData } from "../firebase/utils";
import UserRepository from "../db/repositories/User.repository";
import IntegrationRepository from "../db/repositories/Integration.repository";
import { NextResponse } from "next/server";

export async function POST(request) {
  const requestBody = await request.json();
  const idToken = getIDTokenFromRequest(request);
  const data = await getUserFederatedData(idToken);
  const userRepository = new UserRepository();
  const integrationRepository = new IntegrationRepository();
  const user = await userRepository.getUserByFirebaseId(data.firebaseId);
  if (!user.isAdmin)
    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });

  const integrationData = await integrationRepository.createNewIntegration(
    requestBody
  );
  return NextResponse.json(integrationData);
}
