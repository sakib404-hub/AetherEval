import { Router } from "express";
import { MentorController } from "./mentor.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { MentorValidation } from "./mentor.validation";
import { checkAuth } from "../../middleware/checkAuthentication";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post(
	"/register-as-mentor",
	validateRequest(MentorValidation.registerAsMentorValidationSchema),
	MentorController.registerAsMentor,
);

router.patch(
	"/update-submission-status/:submissionId",
	checkAuth(Role.MENTOR, Role.ADMIN),
	validateRequest(MentorValidation.updateSubmissionStatusValidationSchema),
	MentorController.updateSubmissionStatus,
);

export const MentorRouter = router;
