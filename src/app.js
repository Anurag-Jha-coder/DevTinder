import express from "express";
import connectDB from "./config/database.js";
const app = express();
import { User } from "./models/user.js";

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sachin",
    lastName: "Tendulkar",
    emailId: "sachin123@gmail.com",
    password: "Anurag2002",
  });

  try {
    await user.save();

    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("The user not created");
  }
});

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
