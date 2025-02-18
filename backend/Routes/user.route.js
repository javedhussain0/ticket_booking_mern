import express from 'express';
import {login , register, updateProfile} from "../Controllers/userController.js"
import { isAuthentication } from '../middleware/isAuthentication.js';
const router = express.router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthentication,updateProfile);

export default router;