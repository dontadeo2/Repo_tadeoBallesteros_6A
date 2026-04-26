import mongoose from "mongoose";

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB".green);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    isConnected = true;
    console.log("Connected to MongoDB".green);
  } catch (error) {
    console.error("Error al conectar a MongoDB:".red, error);
  }
};

const db = mongoose.connection;

db.on("error", (error) =>{ 
    isConnected = false;
    console.error("MongoDB connection error:".red, error);
});

db.once("open", () => {
    isConnected = true;
     console.log("MongoDB connection opened".green);
});

db.on("disconnected", () => {
  isConnected = false;
  console.log("MongoDB connection disconnected".yellow);
} );
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB desconectado".yellow);
  process.exit(0);
});

export { connectToDatabase, isConnected };
