import express from "express";
import connectDB from "./config/database.js";
const app = express();

import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import RequestRouter  from "./routes/request.js";


app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/", profileRouter)
app.use("/", RequestRouter);




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
