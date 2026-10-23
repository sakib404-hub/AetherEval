import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import type { ZodType } from "zod";
import { catchAsync } from "../utility/catchAsync";
import { AppError } from "../utility/AppError";

export const validateRequest = (zodSchema: ZodType) => {
	return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const payLoad = req.body ?? {};

		const result = await zodSchema.safeParseAsync(payLoad);

		if (!result.success) {
			const errorMessage =
				result.error.issues.map((issue) => issue.message).join(", ") ||
				"Validation Error";

			throw new AppError(httpStatus.BAD_REQUEST, errorMessage);
		}

		//? assigning the validated body again
		req.body = result.data;
		next();
	});
};
