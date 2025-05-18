import express from "express";
import connectDB from "./config/database.js";
const app = express();
import { User } from "./models/user.js";

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("The user not created  " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.emailId;

  try {
    const user = await User.find({ emailId: email });
    if (user.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find({});
    res.status(200).send(feed);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong while deleting user");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skill", "age", "gender"];

    const isAllowedUpdate = Object
      .keys(data)
      .every((k) => ALLOWED_UPDATES.includes(k));

      if(!isAllowedUpdate){
        throw new Error("Update not allowed")
      }
      
      if(data?.skill.length > 10){
        throw new Error("Skill should be less then 10")
      }
      

    const user = await User.findByIdAndUpdate(req.params?.userId, data);
    res.status(200).send("User updated successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("Somthing went wrong while updating the user: " + err.message);
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
