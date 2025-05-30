import mongoose from "mongoose";

export interface Note {
    uuid: string;
    content: string;
}

const note = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    content: { type: String, required: true },
});

export default mongoose.models.Note || mongoose.model("Note", note);
