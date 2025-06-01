import type { Document } from "mongoose";

export interface IFile extends Document {
    name: string;
    type: "file" | "folder";
    content?: string | null;
    parent?: mongoose.Types.ObjectId | null;
}

export type FileNode = {
    _id: string;
    name: string;
    type: "file" | "folder";
    parent: string | null;
    children?: FileNode[];
};
