import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
	throw new Error(
		"Please define the CONNECTION_URL environment variable inside .env",
	);
}

let cached = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const options = {
			appName: "devrel.vercel.integration",
			maxIdleTimeMS: 5000,
		};

		cached.promise = mongoose
			.connect(MONGODB_URI, options)
			.then((mongoose) => {
				return mongoose;
			});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default connectDB;
