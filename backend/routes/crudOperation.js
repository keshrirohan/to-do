import express from "express";

import {
  deleteData,
  getdata,
  postdata,
  updateData,
} from "../controller/todo.controller.js";
const router = express.Router();

router.get("/data", getdata);
router.post("/create", postdata);
router.delete("/delete/:id", deleteData);
router.put("/update/:id", updateData);

export default router;
