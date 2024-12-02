import mongoose, { Schema, Document, Model } from "mongoose";

interface IBook extends Document {
    title: string;
    imageUrl:string;
    filePath: string;
    owner: string;
}

const bookSchema = new Schema<IBook> ({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
});

const Item: Model<IBook> = mongoose.models.Item || mongoose.model<IBook>("Item", bookSchema);
export default Item;
