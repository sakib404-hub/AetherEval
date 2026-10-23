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
	async (req: Request, res: Response, _next: NextFunction) => {
		const user = req.user;

		const result = await SubmissionService.getMySubmissions(
			user?.userId as string,
		);

		return sendResponse(res, {
			success: true,
			statusCode: status.OK,
			message: "My submissions retrieved successfully.",
			data: result,
		});
	},
);

const getSingleSubmission = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { id } = req.params;
		const user = req.user;

		const result = await SubmissionService.getSingleSubmission(
			id as string,
			user,
		);

		return sendResponse(res, {
			success: true,
			statusCode: status.OK,
			message: "Submission retrieved successfully.",
			data: result,
		});
	},
);

const editSubmission = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { id } = req.params;
		const user = req.user;
		const payload = req.body;

		const result = await SubmissionService.editSubmission(
			id as string,
			payload,
			user,
		);

		return sendResponse(res, {
			success: true,
			statusCode: status.OK,
			message: "Submission updated and resubmitted successfully.",
			data: result,
		});
	},
);

export const SubmissionController = {
	postSubmission,
	getMySubmissions,
	getSingleSubmission,
	editSubmission,
	updateSubmission: editSubmission,
};
