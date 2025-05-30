import mongoose from "mongoose";

export interface TreeEntry {
    // Marker will be used to mark a folder even if it doesn't contain any notes
    name: string | "_marker_";
    uuid: string | undefined;
    path: string;
}

const treeEntry = new mongoose.Schema({
    name: { type: String, required: true },
    uuid: { type: String, required: false },
    path: { type: String, required: true },
});

export default mongoose.models.treeEntry || mongoose.model("treeEntry", treeEntry);
