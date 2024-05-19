import { NextResponse } from "next/server";
import UserRepository from "../db/repositories/User.repository";

export async function POST(request) {
    const email = request.email;
    const userRepository = new UserRepository();
    const existingRecord = await userRepository.getUserByEmail(email);

    if (existingRecord) {
        // Match password and return idToken
    } else {
        return NextResponse.error();
    }
}