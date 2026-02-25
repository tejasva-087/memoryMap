import express from "express";

import validator from "../utils/validator.js";
import { signUpSchema } from "../validators/users.validator.js";
import { signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validator(signUpSchema), signUp);

export default router;
