import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/bookSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const books = await Item.find();
    return NextResponse.json({books});
}

export async function POST(request: NextRequest) {
  const { title, imageUrl } = await request.json();
  await connectMongoDB();
  await Item.create({title, imageUrl});
  return NextResponse.json({message: "Book added successfully"}, {status: 201})
}


