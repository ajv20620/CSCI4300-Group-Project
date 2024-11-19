import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const {username, password} = await request.json();
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
        username,
        password: hashedPassword,
    }
    await User.create(newUser);
}