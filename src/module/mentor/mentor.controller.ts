import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { MentorServices } from "./mentor.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const registerAsMentor = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const payload = req.body;

		const result = await MentorServices.registerAsMentor(payload);

		return sendResponse(res, {
			success: true,
			statusCode: status.CREATED,
			message:
				"Mentor registration application submitted successfully. Your account is pending admin approval.",
			data: result,
		});
	},
);

export const MentorController = {
	registerAsMentor,
};
