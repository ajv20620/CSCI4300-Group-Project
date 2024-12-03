import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/bookSchema";
import {uploadFile} from "@/libs/uploadFile"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: {id: string};
}

function generateUniqueFileName(file: File) {
    const originalName = file.name;
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1e6);
    const fileExtension = originalName.split('.').pop();
    const baseName = originalName.replace(`.${fileExtension}`, "");
    const newName = `${baseName}_${timestamp}_${randomNum}.${fileExtension}`;
    return new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    });
}

export async function DELETE(request: NextRequest, {params}: RouteParams) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({message: "Invalid ID format"}, {status:400});
    }

    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
        return NextResponse.json({message:"Item not found" }, {status:404});
    }

    return NextResponse.json({message:"Item deleted" }, {status:200});
}

export async function PUT(request:NextRequest, {params}:RouteParams) {
    const { id } = await params;
    try {
        const formData = await request.formData();
        const title = formData.get("title");
        const imageUrl = formData.get("imageUrl");
        const file = generateUniqueFileName(formData.get("file") as File);
        const filePath = "/uploads/" + file.name;
        
        const updatedFileForm = new FormData();
        updatedFileForm.append("file", file);
        await uploadFile(updatedFileForm);
        await connectMongoDB();
        await Item.findByIdAndUpdate(id, {title, imageUrl, filePath});
        console.log(`Updated: ${title} to ${filePath}`)
        console.log(file);
        return NextResponse.json({message: "Book added successfully"}, {status: 201})
      } catch (err: any) {
        console.log(`Error: ${err.message}`);
        return NextResponse.json({status: "fail", error: err})
      }
}

export async function GET(request: NextRequest, {params}:RouteParams) {
    const {id} = await params;
    await connectMongoDB();
    const book = await Item.findById(id);
    return NextResponse.json({ book });
}
