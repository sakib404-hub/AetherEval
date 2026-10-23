import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuthentication";
import { Role } from "../../../prisma/generated/prisma/enums";
import { AdminController } from "./admin.controller";

const router = Router();

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
router.put(
	"/approve-mentor/:mentorId",
	checkAuth(Role.ADMIN),
	AdminController.approveMentor,
);

export const AdminRouter = router;
