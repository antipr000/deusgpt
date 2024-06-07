import { NextResponse } from "next/server";
import IntegrationRepository from "../db/repositories/Integration.repository";

export const dynamic = "force-dynamic";

export async function GET() {
  const integrationRepository = new IntegrationRepository();
  const data = await integrationRepository.getAllIntegrations();
  return NextResponse.json(data);
}
