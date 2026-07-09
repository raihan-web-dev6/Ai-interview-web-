import mongoose from "mongoose";

const mongodburl=process.env.MONGODB_URI
console.log("MONGODB_URI connected");

if (!mongodburl) {
    throw new Error("MONGODB_URI environment variable is not defined");
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const connectDb = async () => {
    if (cached.conn) {
        return cached.conn
    }

if (!cached.promise) {
        cached.promise = mongoose.connect(mongodburl).then((conn) => conn.connection)
    }


    try {
        cached.conn = await cached.promise
        return cached.conn
        
    } catch (error) {
        console.log(error)
    }

    
}

export default connectDb
