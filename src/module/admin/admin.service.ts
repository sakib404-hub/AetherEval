import status from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { Role, UserStatus } from "../../../prisma/generated/prisma/enums";
import { Prisma } from "../../../prisma/generated/prisma/client";
import { TUpdateMentorStatusPayload } from "./admin.validation";

const getAllMentors = async (query?: { status?: UserStatus | string }) => {
	const whereConditions: Prisma.UserWhereInput = {
		role: Role.MENTOR,
	};

	if (query?.status) {
		whereConditions.status = query.status as UserStatus;
	}

	const mentors = await prisma.user.findMany({
		where: whereConditions,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			status: true,
			expertise: true,
			bio: true,
			portfolioUrl: true,
			rejectionReason: true,
			createdAt: true,
			updatedAt: true,
			_count: {
				select: {
					reviewsDone: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return mentors;
};

const getMentorById = async (mentorId: string) => {
	if (!mentorId) {
		throw new AppError(status.BAD_REQUEST, "Mentor ID is required.");
	}

	const mentor = await prisma.user.findFirst({
		where: {
			id: mentorId,
			role: Role.MENTOR,
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
			rejectionReason: true,
			createdAt: true,
			updatedAt: true,
			reviewsDone: {
				select: {
					id: true,
					projectName: true,
					status: true,
					reviewedAt: true,
					reviewComment: true,
				},
			},
		},
	});

	if (!mentor) {
		throw new AppError(status.NOT_FOUND, "Mentor not found.");
	}

	return mentor;
};

const updateMentorStatus = async (
	mentorId: string,
	payload: TUpdateMentorStatusPayload,
) => {
	if (!mentorId) {
		throw new AppError(status.BAD_REQUEST, "Mentor ID is required.");
	}

	const mentor = await prisma.user.findFirst({
		where: {
			id: mentorId,
			role: Role.MENTOR,
		},
	});

	if (!mentor) {
		throw new AppError(status.NOT_FOUND, "Mentor not found.");
	}

	if (mentor.status === payload.status) {
		throw new AppError(
			status.BAD_REQUEST,
			`Mentor status is already ${payload.status}.`,
		);
	}

	const updatedMentor = await prisma.user.update({
		where: { id: mentorId },
		data: {
			status: payload.status,
			rejectionReason:
				payload.status === UserStatus.REJECTED
					? payload.rejectionReason?.trim() || "Application rejected by admin."
					: null,
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
			rejectionReason: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return updatedMentor;
};

export const AdminServices = {
	getAllMentors,
	getMentorById,
	updateMentorStatus
};
