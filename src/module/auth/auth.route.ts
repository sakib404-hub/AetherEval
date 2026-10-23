import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/signup", AuthController.userSignUp);
router.post("/login", AuthController.userLogin);
router.get("/me", AuthController.getMe);

export const AuthRouter = router;
