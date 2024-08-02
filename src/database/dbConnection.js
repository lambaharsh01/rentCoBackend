import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    if (mongoose.connection.readyState === 1)
      return console.log("MongoDB is already connected.");

    await mongoose.connect(process.env.CONNECTION_STRING, {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      maxPoolSize: 20,
      retryWrites: true,
      monitorCommands: true,
    });

    return console.log("Mongoose Connected");
  } catch (error) {
    return console.log(error);
  }
};

export default dbConnection;
