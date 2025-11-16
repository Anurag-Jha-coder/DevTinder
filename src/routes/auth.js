import { Router } from "express";
import { User } from "../models/user.js";
import { validateSignUpData } from "../utils/validator.js";
import bcrypt from "bcrypt";
import userAuth from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    // validate data
    validateSignUpData(req);

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new Instance of the user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await user.save();

    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("The user not created  " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User not found");
    }

    const isCorrectPassword = await user.isPasswordCorrect(password);
    if (isCorrectPassword) {
      // create a JWT

      const token = await user.getJWT();

      res.cookie("token", token);

      // console.log(cookie);

      res.status(200).send("Login Successful !")
    } else {
      throw new Error("Invalid Credentials ");
    }
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong while logging in " + err.message);
  }
});

authRouter.post("/logout", async (req, res) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()) 
    });

    res.status(200).send("Logout Successful !"); 
})

export default authRouter;