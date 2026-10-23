import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { checkAuth } from "../../middleware/checkAuthentication";
import { Role } from "../../../prisma/generated/prisma/enums";

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
router.get("/me",checkAuth(Role.ADMIN, Role.MENTOR, Role.STUDENT), AuthController.getMe);

export const AuthRouter = router;
