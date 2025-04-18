import express from "express";
import connectDB from "./config/database.js";
const app = express();


connectDB()
  .then(() => {
    console.log(" Database Connection established succesfully !!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database is not connected ");
  });
