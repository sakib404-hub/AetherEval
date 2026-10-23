import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuthentication";
import { Role } from "../../../prisma/generated/prisma/enums";
import { SubmissionController } from "./submission.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { SubmissionValidation } from "./submission.validation";

const router = Router();

router.post(
	"/",
	checkAuth(Role.STUDENT),
	validateRequest(SubmissionValidation.postSubmissionValidationSchema),
	SubmissionController.postSubmission,
);
router.get(
	"/my",
	checkAuth(Role.STUDENT),
	SubmissionController.getMySubmissions,
);
router.get(
	"/:id",
	checkAuth(Role.ADMIN, Role.MENTOR, Role.STUDENT),
	SubmissionController.getSingleSubmission,
);
router.patch(
	"/:id",
	checkAuth(Role.STUDENT),
	validateRequest(SubmissionValidation.updateSubmissionValidationSchema),
	SubmissionController.editSubmission,
);

export const SubmissionRouter = router;
