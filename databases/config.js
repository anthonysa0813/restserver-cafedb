import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_CNN);
    console.log("Se conectó a la base de datos :D");
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un error en la conexión a la base de datos....");
  }
};

export default connectDB;
