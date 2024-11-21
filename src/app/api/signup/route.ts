import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/UserSchema";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required." },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const existingUser = await User.findOne({ username }).lean();
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists." },
                { status: 409 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        return NextResponse.json(
            { message: "User created successfully", userId: newUser._id },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error during user signup:", err);
        return NextResponse.json(
            { error: "An error occurred during signup." },
            { status: 500 }
        );
    }
}