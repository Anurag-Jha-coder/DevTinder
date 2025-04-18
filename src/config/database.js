import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://akumarjha431:Anurag2002@cluster0.j3ywsxo.mongodb.net/devTinder"
  );
};


export default connectDB


