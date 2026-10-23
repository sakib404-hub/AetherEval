import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { MentorServices } from "./mentor.service";
import { sendResponse } from "../../utility/sendResponse";
import status from "http-status";
import { SubmissionStatus } from "../../../prisma/generated/prisma/enums";

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

const updateSubmissionStatus = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const { submissionId } = req.params;
		const user = req.user;
		const payload = req.body;

		const result = await MentorServices.updateSubmissionStatus(
			submissionId as string,
			payload,
			user?.userId as string,
		);

		const actionMessage =
			payload.status === SubmissionStatus.APPROVED
				? "Submission approved successfully."
				: "Submission rejected successfully.";

		return sendResponse(res, {
			success: true,
			statusCode: status.OK,
			message: actionMessage,
			data: result,
		});
	},
);

export const MentorController = {
	registerAsMentor,
	updateSubmissionStatus,
	updateSubmissionSatus: updateSubmissionStatus,
};
