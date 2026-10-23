import bcrypt from "bcryptjs";
import status from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { config } from "../../config/config";
import {
	Role,
	SubmissionStatus,
	UserStatus,
} from "../../../prisma/generated/prisma/enums";
import { Prisma } from "../../../prisma/generated/prisma/client";
import {
	TRegisterAsMentorPayload,
	TUpdateSubmissionStatusPayload,
} from "./mentor.validation";

const registerAsMentor = async (payload: TRegisterAsMentorPayload) => {
	const email = payload.email.trim().toLowerCase();

	const isUserExist = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (isUserExist) {
		throw new AppError(
			status.BAD_REQUEST,
			"User with this email already exists.",
		);
	}

	const hashedPassword = await bcrypt.hash(
		payload.password,
		Number(config.bcrypt_salt_rounds || 10),
	);

	const mentor = await prisma.user.create({
		data: {
			name: payload.name.trim(),
			email,
			password: hashedPassword,
			role: Role.MENTOR,
			status: UserStatus.PENDING_APPROVAL,
			expertise: payload.expertise.trim(),
			bio: payload.bio.trim(),
			portfolioUrl: payload.portfolioUrl.trim(),
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			status: true,
			expertise: true,
			bio: true,
			portfolioUrl: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return mentor;
};

const updateSubmissionStatus = async (
	submissionId: string,
	payload: TUpdateSubmissionStatusPayload,
	mentorId: string,
) => {
	if (!submissionId) {
		throw new AppError(status.BAD_REQUEST, "Submission ID is required.");
	}

	const mentor = await prisma.user.findUnique({
		where: { id: mentorId },
	});

	if (!mentor) {
		throw new AppError(status.NOT_FOUND, "Mentor account not found.");
	}

	if (mentor.status !== UserStatus.ACTIVE) {
		throw new AppError(
			status.FORBIDDEN,
			"Only active mentors can review and update submissions.",
		);
	}

	const submission = await prisma.submission.findUnique({
		where: { id: submissionId },
	});

	if (!submission) {
		throw new AppError(status.NOT_FOUND, "Submission not found.");
	}

	if (submission.status === payload.status) {
		throw new AppError(
			status.BAD_REQUEST,
			`Submission status is already ${payload.status}.`,
		);
	}

	const comment = (
		payload.reviewComment ||
		payload.rejectionReason ||
		""
	).trim();

	if (payload.status === SubmissionStatus.REJECTED && !comment) {
		throw new AppError(
			status.BAD_REQUEST,
			"Rejection reason is required when rejecting a submission.",
		);
	}

	const updatedSubmission = await prisma.submission.update({
		where: { id: submissionId },
		data: {
			status: payload.status,
			reviewComment: comment || null,
			reviewedAt: new Date(),
			reviewedById: mentorId,
		},
		include: {
			student: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
				},
			},
			reviewedBy: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					expertise: true,
				},
			},
		},
	});

	return updatedSubmission;
};

const getAllSubmissions = async (
	query?: {
		status?: SubmissionStatus | string;
		studentId?: string;
		projectName?: string;
	},
	mentorId?: string,
) => {
	if (mentorId) {
		const mentor = await prisma.user.findUnique({
			where: { id: mentorId },
		});

		if (!mentor) {
			throw new AppError(status.NOT_FOUND, "Mentor account not found.");
		}

		if (mentor.role === Role.MENTOR && mentor.status !== UserStatus.ACTIVE) {
			throw new AppError(
				status.FORBIDDEN,
				"Only active mentors can access student submissions.",
			);
		}
	}

	const whereConditions: Prisma.SubmissionWhereInput = {};

	if (query?.status) {
		whereConditions.status = query.status as SubmissionStatus;
	}

	if (query?.studentId) {
		whereConditions.studentId = query.studentId;
	}

	if (query?.projectName) {
		whereConditions.projectName = {
			contains: query.projectName,
			mode: "insensitive",
		};
	}

	const submissions = await prisma.submission.findMany({
		where: whereConditions,
		include: {
			student: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
				},
			},
			reviewedBy: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
					expertise: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return submissions;
};

export const MentorServices = {
	registerAsMentor,
	updateSubmissionStatus,
	updateSubmissionSatus: updateSubmissionStatus,
	getAllSubmissions,
	getAllSubmission: getAllSubmissions,
};
