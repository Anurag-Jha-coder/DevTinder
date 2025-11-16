import express from "express";
import { User } from "../models/user.js";
import userAuth from "../middlewares/auth.js";
import { ConnectionRequest } from "../models/connectionRequest.js";
// import { Connection } from "mongoose";

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skill";
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInuser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.status(200).json({
      message: "Received connection requests fetched successfully",
      data: receivedRequests,
    });
  } catch (err) {
    res.status(400).send("Error in fetching received requests: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInuser._id, status: "accepted" },
        { fromUserId: loggedInuser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((connection) => {
      if (connection.fromUserId._id.equals(loggedInuser._id)) {
        return connection.toUserId;
      } else {
        return connection.fromUserId;
      }
    });

    res.status(200).json({
      message: "Connections fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(400).send("Error in fetching connections: " + err.message);
  }
});

//logic of feed api to be implemented
// logged in user see all the users except:
// his/her connection
// and himself/herself

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    // found all connections of logged in user
    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInuser._id }, { toUserId: loggedInuser._id }],
    }).select("fromUserId toUserId -_id");

    // create a set of user IDs to hide (connections)
    const hideUserData = new Set();
    connections.forEach((connection) => {
      hideUserData.add(connection.fromUserId.toString());
      hideUserData.add(connection.toUserId.toString());
    });

    // db query to find users excluding the logged in user and his/her connections

    const usersFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserData) } },
        { _id: { $ne: loggedInuser._id } },
      ],
    }).select(USER_SAFE_DATA);

    res.status(200).json({
      message: "User feed fetched successfully",
      data: usersFeed,
    });
  } catch (err) {
    res.status(400).send("Error in fetching user feed: " + err.message);
  }
});

export default userRouter;
