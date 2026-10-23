import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { AdminServices } from "./admin.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";
import { UserStatus } from "../../../prisma/generated/prisma/enums";

const getAllMentors = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const query = req.query;

		const result = await AdminServices.getAllMentors(query);

		return sendResponse(res, {
			success: true,
			statusCode: status.OK,
			message: "All mentors retrieved successfully.",
			data: result,
		});
	},
);

const getMentorById = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { mentorId } = req.params;

		const result = await AdminServices.getMentorById(mentorId as string);

		return sendResponse(res, {
			success: true,
			statusCode: status.OK,
			message: "Mentor retrieved successfully.",
			data: result,
		});
	},
);

const updateMentorStatus = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { mentorId } = req.params;
		const payload = req.body;

		const result = await AdminServices.updateMentorStatus(
			mentorId as string,
			payload,
		);

		const actionMessage =
			payload.status === UserStatus.ACTIVE
				? "Mentor approved successfully."
				: payload.status === UserStatus.REJECTED
					? "Mentor rejected successfully."
					: `Mentor status updated to ${payload.status} successfully.`;

		return sendResponse(res, {
			success: true,
			statusCode: status.OK,
			message: actionMessage,
			data: result,
		});
	},
);


export const AdminController = {
	getAllMentors,
	getMentorById,
	updateMentorStatus,
};
