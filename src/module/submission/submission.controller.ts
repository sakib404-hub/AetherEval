import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { SubmissionService } from "./submission.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";

const postSubmission = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const user = req.user;
		const payload = req.body;

		const result = await SubmissionService.postSubmission(payload, user);

		return sendResponse(res, {
			success: true,
			statusCode: status.CREATED,
			message: "Project submitted successfully.",
			data: result,
		});
	},
);

const getMySubmissions = catchAsync(
	async (_req: Request, _res: Response, _next: NextFunction) => {},
);

const getSingleSubmission = catchAsync(
	async (_req: Request, _res: Response, _next: NextFunction) => {},
);

export const SubmissionController = {
	postSubmission,
	getMySubmissions,
	getSingleSubmission,
};
