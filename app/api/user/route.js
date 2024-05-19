import { NextResponse } from "next/server";
import UserRepository from "../db/repositories/User.repository";

export async function POST(request) {
    const requestBody = await request.json();
    const userRepository = new UserRepository();

    return NextResponse.json({
        "message": "Connected"
    });
}