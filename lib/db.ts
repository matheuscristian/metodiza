import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true }, dbName: "test" };

async function makeConnection<t>(handler: (connection: mongoose.Connection) => Promise<t>) {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
    }

    try {
        await mongoose.connect(MONGODB_URI, clientOptions as ConnectOptions);
    } finally {
        const result = await handler(mongoose.connection);
        await mongoose.disconnect();
        return result;
    }
}

export default makeConnection;
