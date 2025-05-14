import express from "express";
import { shouldBeAdmin, shouldBeLoggedin } from "../controllers/test.controller.js";

const router = express.Router();


router.get("/should-be-logged-in", shouldBeLoggedin);
router.get("/should-be-admin", shouldBeAdmin);


export default router