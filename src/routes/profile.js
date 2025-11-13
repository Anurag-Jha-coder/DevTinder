import express from "express";
import { User } from "../models/user.js";
import userAuth from "../middlewares/auth.js";
import { validateProfileUpdates } from "../utils/validator.js";
import bcrypt from "bcrypt"


const profileRouter = express.Router();



profileRouter.get("/profile", userAuth, async (req, res) => {

  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Something went wrong " + error.message);
  }
   
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
     
    try{
        const updates = req.body;
        const isValidUpdate = validateProfileUpdates(req);

        if(!isValidUpdate){
            throw new Error("Invalid Updates !");
        }

        const loggedInuser = req.user;
        console.log(loggedInuser);

        Object.keys(updates).forEach((key) =>{
            loggedInuser[key] = updates[key];
        })

        await loggedInuser.save();

        res.status(200).send(`${loggedInuser.firstName}  your profile is updated successfully !` );
    }
    catch(error){
        res.status(400).send("Something went wrong " + error.message);
    }
    
    
})

profileRouter.patch("/profile/password-change", userAuth, async(req, res) =>{

    try {

        const {currentPassword, newPassword} = req.body;
        const loggendInUser = req.user;
        
        const isCorrectPassword = await loggendInUser.isPasswordCorrect(currentPassword);
        if(!isCorrectPassword){
            throw new Error("Invalid password !");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        loggendInUser.password = hashedPassword;
        loggendInUser.save();

        res.status(200).send("Password changed Successfully! ");
        
    } catch (error) {
        
        res.status(401).send("Password can not be changed: "+ error.message);
    }


})








export default profileRouter; 