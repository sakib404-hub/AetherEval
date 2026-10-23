import status from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import {
	TPostSubmissionPayload,
	TUpdateSubmissionPayload,
} from "./submission.validation";
import { RequestUser } from "../../middleware/checkAuthentication";
import {
	Role,
	SubmissionStatus,
	UserStatus,
} from "../../../prisma/generated/prisma/enums";

const postSubmission = async (
	payload: TPostSubmissionPayload,
	user?: RequestUser,
) => {
	const studentId = user?.userId || payload.studentId;

	// 1. Identity & Role authorization check
	if (user && payload.studentId && user.userId !== payload.studentId) {
		throw new AppError(
			status.FORBIDDEN,
			"You cannot submit a project on behalf of another student.",
		);
	}

	// 2. Validate student account existence and eligibility
	const student = await prisma.user.findUnique({
		where: { id: studentId },
	});

	if (!student) {
		throw new AppError(status.NOT_FOUND, "Student account not found.");
	}

	if (student.role !== Role.STUDENT) {
		throw new AppError(
			status.FORBIDDEN,
			"Only users with the student role can submit projects.",
		);
	}

	if (student.status === UserStatus.BLOCKED) {
		throw new AppError(
			status.FORBIDDEN,
			"Your account has been blocked. Please contact support.",
		);
	}

	if (student.status !== UserStatus.ACTIVE) {
		throw new AppError(
			status.FORBIDDEN,
			"Your account is not active. Please complete account verification.",
		);
	}

	// 3. Link consistency check: ensure liveLink and repoUrl are not identical
	if (
		payload.repoUrl.trim().toLowerCase() ===
		payload.liveLink.trim().toLowerCase()
	) {
		throw new AppError(
			status.BAD_REQUEST,
			"Live link cannot be the same as the repository URL.",
		);
	}

	// 4. Unique repository URL check
	const existingRepo = await prisma.submission.findUnique({
		where: { repoUrl: payload.repoUrl.trim() },
	});

	if (existingRepo) {
		throw new AppError(
			status.CONFLICT,
			"A submission with this repository URL already exists.",
		);
	}

	// 5. Duplicate submission check for the same project
	const existingSubmission = await prisma.submission.findFirst({
		where: {
			studentId,
			projectName: {
				equals: payload.projectName.trim(),
				mode: "insensitive",
			},
		},
	});

	if (existingSubmission) {
		if (existingSubmission.status === SubmissionStatus.APPROVED) {
			throw new AppError(
				status.BAD_REQUEST,
				"This project has already been approved and cannot be resubmitted.",
			);
		}

		if (existingSubmission.status === SubmissionStatus.PENDING) {
			throw new AppError(
				status.BAD_REQUEST,
				"You already have a pending submission for this project. Please wait for mentor review.",
			);
		}
	}

	// 6. Create submission with enforced initial status
	const submission = await prisma.submission.create({
		data: {
			projectName: payload.projectName.trim(),
			repoUrl: payload.repoUrl.trim(),
			liveLink: payload.liveLink.trim(),
			description: payload.description.trim(),
			status: SubmissionStatus.PENDING,
			studentId,
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
		},
	});

	return submission;
};

const getMySubmissions = async (userId: string) => {
	// Validate student account existence and status
	const student = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!student) {
		throw new AppError(status.NOT_FOUND, "Student account not found.");
	}

	if (student.status === UserStatus.BLOCKED) {
		throw new AppError(
			status.FORBIDDEN,
			"Your account has been blocked. Please contact support.",
		);
	}

	const submissions = await prisma.submission.findMany({
		where: {
			studentId: userId,
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
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return submissions;
};

const getSingleSubmission = async (id: string, user?: RequestUser) => {
	if (!id) {
		throw new AppError(status.BAD_REQUEST, "Submission ID is required.");
	}

	const submission = await prisma.submission.findUnique({
		where: { id },
		include: {
			student: {
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
				},
			},
		},
	});

	if (!submission) {
		throw new AppError(status.NOT_FOUND, "Submission not found.");
	}

	// Authorization check: students can only access their own submissions
	if (user?.role === Role.STUDENT && submission.studentId !== user.userId) {
		throw new AppError(
			status.FORBIDDEN,
			"You do not have permission to view this submission.",
		);
	}

	return submission;
};

const editSubmission = async (
	id: string,
	payload: TUpdateSubmissionPayload,
	user?: RequestUser,
) => {
	if (!id) {
		throw new AppError(status.BAD_REQUEST, "Submission ID is required.");
	}

	const submission = await prisma.submission.findUnique({
		where: { id },
	});

	if (!submission) {
		throw new AppError(status.NOT_FOUND, "Submission not found.");
	}

	if (user && submission.studentId !== user.userId) {
		throw new AppError(
			status.FORBIDDEN,
			"You do not have permission to edit this submission.",
		);
	}

	if (submission.status !== SubmissionStatus.REJECTED) {
		throw new AppError(
			status.BAD_REQUEST,
			`You can only edit a submission if its status is REJECTED. Current status: ${submission.status}.`,
		);
	}

	if (!payload || Object.keys(payload).length === 0) {
		throw new AppError(
			status.BAD_REQUEST,
			"Please provide at least one field to update.",
		);
	}

	const finalRepoUrl = payload.repoUrl
		? payload.repoUrl.trim()
		: submission.repoUrl;
	const finalLiveLink = payload.liveLink
		? payload.liveLink.trim()
		: submission.liveLink;

	if (finalRepoUrl.toLowerCase() === finalLiveLink.toLowerCase()) {
		throw new AppError(
			status.BAD_REQUEST,
			"Live link cannot be the same as the repository URL.",
		);
	}

	if (payload.repoUrl && payload.repoUrl.trim() !== submission.repoUrl) {
		const existingRepo = await prisma.submission.findUnique({
			where: { repoUrl: payload.repoUrl.trim() },
		});

		if (existingRepo && existingRepo.id !== id) {
			throw new AppError(
				status.CONFLICT,
				"A submission with this repository URL already exists.",
			);
		}
	}

	// Update the submission and reset status to PENDING for re-evaluation
	const updatedSubmission = await prisma.submission.update({
		where: { id },
		data: {
			...(payload.projectName && { projectName: payload.projectName.trim() }),
			...(payload.repoUrl && { repoUrl: payload.repoUrl.trim() }),
			...(payload.liveLink && { liveLink: payload.liveLink.trim() }),
			...(payload.description && { description: payload.description.trim() }),
			status: SubmissionStatus.PENDING,
			reviewComment: null,
			reviewedAt: null,
			reviewedById: null,
		},
	});

	return updatedSubmission;
};

export const SubmissionService = {
	postSubmission,
	getMySubmissions,
	getSingleSubmission,
	editSubmission,
	updateSubmission: editSubmission,
};
