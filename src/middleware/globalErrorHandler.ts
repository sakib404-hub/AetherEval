import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { config } from "../config/config";
import { Prisma } from "../../prisma/generated/prisma/client";
import { AppError } from "../utility/AppError";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = async (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const isDev = config.node_env?.toLowerCase() === "development";

	if (isDev) {
		console.log("Error from Global Error Handler:", err);
	}

	let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
	let errorMessage = err.message || "Internal Server Error";
	let errorName = err.name || "Internal Server Error";

	if (err instanceof Prisma.PrismaClientValidationError) {
		statusCode = httpStatus.BAD_REQUEST;
		errorMessage = "You have provided incorrect field type or missing fields";
		errorName = "PrismaClientValidationError";
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		errorName = "PrismaClientKnownRequestError";
		if (err.code === "P2002") {
			statusCode = httpStatus.CONFLICT;
			const target = Array.isArray(err.meta?.target)
				? err.meta.target.join(", ")
				: typeof err.meta?.target === "string"
					? err.meta.target
					: "";
			errorMessage = target
				? `Duplicate field value for '${target}'. Please use another value.`
				: "Duplicate Key Error";
		} else if (err.code === "P2003") {
			statusCode = httpStatus.BAD_REQUEST;
			const field = (err.meta?.field_name as string) || "";
			errorMessage = field
				? `Foreign key constraint failed on field: ${field}`
				: "Related record not found";
		} else if (err.code === "P2023") {
			statusCode = httpStatus.BAD_REQUEST;
			errorMessage = "Inconsistent column data or invalid ID format";
		} else if (err.code === "P2025") {
			statusCode = httpStatus.NOT_FOUND;
			errorMessage = (err.meta?.cause as string) || "Record not found";
		}
	} else if (err instanceof Prisma.PrismaClientInitializationError) {
		errorName = "PrismaClientInitializationError";
		if (err.errorCode === "P1000") {
			statusCode = httpStatus.UNAUTHORIZED;
			errorMessage =
				"Authentication failed against database server. Please check your credentials";
		} else if (err.errorCode === "P1001") {
			statusCode = httpStatus.BAD_REQUEST;
			errorMessage = "Can't reach database server";
		}
	} else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		errorMessage = "Error occurred during query execution";
		errorName = "PrismaClientUnknownRequestError";
	} else if (err instanceof AppError) {
		errorMessage = err.message;
		statusCode = err.statusCode;
		errorName = "AppError";
	} else if (err instanceof z.ZodError || err?.name === "ZodError") {
		statusCode = httpStatus.BAD_REQUEST;
		errorMessage =
			err.issues?.map((issue: any) => issue.message).join(", ") ||
			"Validation Error";
		errorName = "ZodValidationError";
	} else if (err?.name === "JsonWebTokenError") {
		statusCode = httpStatus.UNAUTHORIZED;
		errorMessage = "Invalid token. Please authenticate again.";
		errorName = "JsonWebTokenError";
	} else if (err?.name === "TokenExpiredError") {
		statusCode = httpStatus.UNAUTHORIZED;
		errorMessage = "Token has expired. Please log in again.";
		errorName = "TokenExpiredError";
	} else if (err instanceof Error) {
		errorMessage = err.message;
	}

	const isClientError = statusCode >= 400 && statusCode < 500;

	res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
		success: false,
		statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
		name: isDev || isClientError ? errorName : "Internal Server Error",
		message: isDev || isClientError ? errorMessage : "Internal Server Error",
		error: isDev ? err : undefined,
		stack: isDev ? err.stack : undefined,
	});
};
