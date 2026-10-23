import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { AdminServices } from "./admin.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

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

const approveMentor = catchAsync(
	async (_req: Request, _res: Response, _next: NextFunction) => {},
);

export const AdminController = {
	getAllMentors,
	getMentorById,
	approveMentor,
};
