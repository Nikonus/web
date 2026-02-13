import mongoose from "mongoose";
import { buffer } from "stream/consumers";


const MONGODB_URL = process.env.MONGODB_URL !;

if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in environment variables");
}


let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}


export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxpoolsize: 10,
        };

        cached.promise = mongoose.connect(MONGODB_URL).then(() => mongoose.connection )
            
        
    }


    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        throw error;
    }
    return cached.conn;
        };