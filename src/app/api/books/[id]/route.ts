import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/bookSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: {id: string};
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
    const {id} = await params;
    const {title: title, imageUrl: imageUrl} = await request.json();
    await connectMongoDB();
    await Item.findByIdAndUpdate(id, {title, imageUrl});
    return NextResponse.json({ message: "Item updated" }, {status: 200});
}
