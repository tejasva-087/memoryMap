import express from "express";

import validator from "../validators/validator";
import { loginSchema, signUpSchema } from "../validators/users.validator.js";
import { logIn, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validator(signUpSchema), signUp);
router.post("/login", validator(loginSchema), logIn);

export default router;
