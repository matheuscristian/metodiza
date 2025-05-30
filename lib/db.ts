import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  dbName: "test",
};

// Global cache object for HMR and serverless environments
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, clientOptions).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Utility to run handler with active connection
async function makeConnection<t>(handler: (connection: mongoose.Connection) => Promise<t>): Promise<t> {
  const db = await connectToDatabase();
  return handler(db.connection);
}

export default makeConnection;
