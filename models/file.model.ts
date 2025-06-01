import { IFile } from "@/types/file";
import mongoose, { Model } from "mongoose";

const FileSchema = new mongoose.Schema<IFile>({
    name: { type: String, required: true },
    type: { type: String, enum: ["file", "folder"], required: true },
    content: { type: String, default: null },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
});

export default (mongoose.models.File as unknown as Model<IFile>) || mongoose.model<IFile>("File", FileSchema);
