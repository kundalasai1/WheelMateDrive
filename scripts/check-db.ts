import { connectDB } from "../lib/db/mongoose";
try{const db=await connectDB();await db.connection.db?.admin().ping();console.log("MongoDB connection successful");process.exit(0)}catch(error){console.error(error instanceof Error?error.message:error);process.exit(1)}
