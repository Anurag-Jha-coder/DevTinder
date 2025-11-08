import { Router } from "express";

const connectionRequestRouter = Router();

connectionRequestRouter.post("/send-request", async (req, res) => {
  // Logic to send a connection request
});

connectionRequestRouter.post("/accept-request", async (req, res) => {
  // Logic to accept a connection request
});

connectionRequestRouter.post("/decline-request", async (req, res) => {
  // Logic to decline a connection request
});

export default connectionRequestRouter;
  