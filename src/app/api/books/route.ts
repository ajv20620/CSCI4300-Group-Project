import connectMongoDB from "@/libs/mongodb";
import { uploadFile } from "@/libs/uploadFile";
import Item from "@/models/bookSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const books = await Item.find();
    return NextResponse.json({books});
}

export async function POST(request: NextRequest) {
  try {

    const formData = await request.formData();

    const title = formData.get("title");
    const imageUrl = formData.get("imageUrl");
    const file = formData.get("file");
    const owner = formData.get("owner");
    const filePath = "public/uploads/" + file?.current?.files?.[0].name;
    
    await uploadFile(await request.formData());
    await connectMongoDB();
    await Item.create({title, imageUrl, filePath, owner});
    return NextResponse.json({message: "Book added successfully"}, {status: 201})
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    return NextResponse.json({status: "fail", error: err})
  }
}


