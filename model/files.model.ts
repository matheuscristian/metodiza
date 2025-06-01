import mongoose, { Document, Model } from "mongoose";

export interface IFile extends Document {
    name: string;
    type: "file" | "folder";
    content?: string | null;
    parent?: mongoose.Types.ObjectId | null;
    path: string;
}

const FileSchema = new mongoose.Schema<IFile>({
    name: { type: String, required: true },
    type: { type: String, enum: ["file", "folder"], required: true },
    content: { type: String, default: null },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
    path: { type: String, required: true },
});

export default (mongoose.models.File as unknown as Model<IFile>) || mongoose.model<IFile>("File", FileSchema);
