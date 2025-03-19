import express from "express";
import { getToilet, postToilet, addLike, addDislike, } from "../controllers/toilet.controller.js";
import upload from "../utils/multer.js";
const toiletRouter = express.Router();
/**
    * @swagger
    * /toilet?latitude=12.9716&longitude=77.5946&radius=1000:
    *  get:
    *  summary: Get all toilets
    *  description: Get all toilets
    * responses:
    * 200:
    * description: Success
    * 500:
    * description: Error while fetching toilets
 */
toiletRouter.get("/toilet", getToilet);
/**
    * @swagger
    * /toilet:
    *  post:
    *  summary: Add a toilet
    *  description: Add a toilet
    * responses:
    * 200:
    * description: Success
    * 500:
    * description: Error while adding toilet
 */
toiletRouter.post("/toilet", upload.array("photos", 2), postToilet);
/**
    * @swagger
    * /toilet/{toiletId}/comment:
    *  post:
    *  summary: Add a comment
    *  description: Add a comment
    * responses:
    * 200:
    * description: Success
    * 500:
    * description: Error while adding comment
 */
toiletRouter.post("/toilet/:toiletId/like", addLike);
/**
    * @swagger
    * /toilet/{toiletId}/dislike:
    *  post:
    *  summary: Add a dislike
    *  description: Add a dislike
    * responses:
    * 200:
    * description: Success
    * 500:
    * description: Error while adding dislike
 */
toiletRouter.post("/toilet/:toiletId/dislike", addDislike);
export default toiletRouter;
