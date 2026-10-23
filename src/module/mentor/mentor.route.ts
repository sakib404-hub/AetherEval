import { Router } from "express";
import { MentorController } from "./mentor.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { MentorValidation } from "./mentor.validation";

const router = Router();

router.post(
	"/register-as-mentor",
	validateRequest(MentorValidation.registerAsMentorValidationSchema),
	MentorController.registerAsMentor,
);

export const MentorRouter = router;
