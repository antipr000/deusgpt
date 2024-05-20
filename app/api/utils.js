import { headers } from "next/headers";

export function getIDTokenFromRequest(request) {
  const headerList = headers();
  const idToken = headerList.get("authorization");
  return idToken;
}
