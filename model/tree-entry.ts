import mongoose from "mongoose";

export interface TreeEntry {
    name: string;
    uuid: string;
    path: string;
}

export type NoteTree = Array<TreeEntry>;

const treeEntry = new mongoose.Schema({
    name: { type: String, required: true },
    uuid: { type: String, required: true },
    path: { type: String, required: true },
});

export default mongoose.models.treeEntry || mongoose.model("treeEntry", treeEntry);
