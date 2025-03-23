import {
    registerUser,
    loginUser,
    getUsers,
    getUserCount,
    getUserForDashboard
} from "../Controllers/User.Controller.js";

import express from "express";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/usercount", getUserCount);
router.get("/userdashboard", getUserForDashboard);

export default router;