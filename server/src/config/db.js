import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is missing. Add it to server/.env.");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUri, {
    dbName: env.databaseName || undefined
  });
}
