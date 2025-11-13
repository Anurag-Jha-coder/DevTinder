import { Router } from "express";
import userAuth from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/ConnectionRequest.js";
import {User} from "../models/user.js";


const RequestRouter = Router();

RequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
     
      // check for incorrect status type
      const allowedStatus = ["interested", "ignored"]

      if(!allowedStatus.includes(status)){
        throw new Error("Invalid status type !");
      }

      // check if toUserId exists or not 

      const isToUserExists = await User.findById(toUserId);
      if(!isToUserExists){
        throw new Error("User with given id does not exists !");
      }

      // if request already exists

      const existingRequest = await ConnectionRequest.findOne({ 
        $or: [
          {fromUserId, toUserId},
          {fromUserId: toUserId, toUserId: fromUserId}
        ]
      })

      if(existingRequest){
        throw new Error("Connection request already exists between these users !");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await connectionRequest.save();
      res.status(200).json({
        message: ` ${req.user.firstName} ${status} ${isToUserExists.firstName}.`,
        data: connectionRequest,
      });
    } catch (e) {
      res.status(400).send("Error in sending connection request " + e.message);
    }
  }
);


export default RequestRouter;