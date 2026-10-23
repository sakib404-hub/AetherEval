import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuthentication";
import { Role } from "../../../prisma/generated/prisma/enums";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = Router();


router.get(
	"/stats",
	checkAuth(Role.ADMIN),
	AdminController.getDashboardStats,
);
router.get(
	"/get-all-mentors",
	checkAuth(Role.ADMIN),
	AdminController.getAllMentors,
);
router.get(
	"/get-mentors-by-id/:mentorId",
	checkAuth(Role.ADMIN),
	AdminController.getMentorById,
);
router.patch(
	"/update-mentor-status/:mentorId",
	checkAuth(Role.ADMIN),
	validateRequest(AdminValidation.updateMentorStatusValidationSchema),
	AdminController.updateMentorStatus,
);
router.put(
	"/update-mentor-status/:mentorId",
	checkAuth(Role.ADMIN),
	validateRequest(AdminValidation.updateMentorStatusValidationSchema),
	AdminController.updateMentorStatus,
);

export const AdminRouter = router;
