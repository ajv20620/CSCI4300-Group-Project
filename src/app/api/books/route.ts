import connectMongoDB from "@/libs/mongodb";
import { uploadFile } from "@/libs/uploadFile";
import Item from "@/models/bookSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get("owner");

    if (!owner) {
      return NextResponse.json(
          { error: "Missing 'owner' query parameter" },
          { status: 400 }
      );
    }

    const books = await Item.find({ owner });
    return NextResponse.json({ books });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const imageUrl = formData.get("imageUrl");
    const file = formData.get("file");
    const owner = formData.get("owner");
    const filePath = "/uploads/" + file.name;
    
    await uploadFile(formData);
    await connectMongoDB();
    await Item.create({title, imageUrl, filePath, owner});
    console.log(`Added: ${title} owned by ${owner} to ${filePath}`)
    console.log(file);
    return NextResponse.json({message: "Book added successfully"}, {status: 201})
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    return NextResponse.json({status: "fail", error: err})
  }
}


