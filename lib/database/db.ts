import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

function makeConnection(handler: (connection: mongoose.Connection) => void) {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined");
    }

    // TO-DO: come up with a name for the database
    mongoose.connect(MONGODB_URI, { dbName: "" });

    const connection = mongoose.connection;

    connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
    });

    connection.once("open", () => {
        console.log("MongoDB connected");
        handler(connection);
        connection.close();
    });
}

export default makeConnection;
