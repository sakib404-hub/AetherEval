import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
	"/signup",
	validateRequest(AuthValidation.signUpValidationSchema),
	AuthController.userSignUp,
);

router.post(
	"/login",
	validateRequest(AuthValidation.loginValidationSchema),
	AuthController.userLogin,
);
router.get("/me", AuthController.getMe);

export const AuthRouter = router;
