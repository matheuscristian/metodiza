import mongoose from "mongoose";

export interface Person {
    name: string;
    age: number;
    address: {
        street: string;
        city: string;
        state: string;
    };
}

const person = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: {
        type: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
        },
        required: true,
    },
});

export default mongoose.models.Person || mongoose.model("Person", person);
