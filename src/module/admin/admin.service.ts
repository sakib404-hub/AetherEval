import status from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { Role, SubmissionStatus, UserStatus } from "../../../prisma/generated/prisma/enums";
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

	// Rejection reason is strictly mandatory whenever status is REJECTED
	if (payload.status === UserStatus.REJECTED) {
		if (!payload.rejectionReason || !payload.rejectionReason.trim()) {
			throw new AppError(
				status.BAD_REQUEST,
				"Rejection reason is required when rejecting a mentor.",
			);
		}
	}

	const updatedMentor = await prisma.user.update({
		where: { id: mentorId },
		data: {
			status: payload.status,
			rejectionReason:
				payload.status === UserStatus.REJECTED
					? payload.rejectionReason?.trim()
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


const getDashboardStats = async () => {
	const [
		totalUsers,
		totalStudents,
		activeStudents,
		totalMentors,
		activeMentors,
		pendingMentors,
		rejectedMentors,
		blockedMentors,
		totalSubmissions,
		pendingSubmissions,
		approvedSubmissions,
		rejectedSubmissions,
	] = await Promise.all([
		prisma.user.count(),
		prisma.user.count({ where: { role: Role.STUDENT } }),
		prisma.user.count({
			where: { role: Role.STUDENT, status: UserStatus.ACTIVE },
		}),
		prisma.user.count({ where: { role: Role.MENTOR } }),
		prisma.user.count({
			where: { role: Role.MENTOR, status: UserStatus.ACTIVE },
		}),
		prisma.user.count({
			where: { role: Role.MENTOR, status: UserStatus.PENDING_APPROVAL },
		}),
		prisma.user.count({
			where: { role: Role.MENTOR, status: UserStatus.REJECTED },
		}),
		prisma.user.count({
			where: { role: Role.MENTOR, status: UserStatus.BLOCKED },
		}),
		prisma.submission.count(),
		prisma.submission.count({
			where: { status: SubmissionStatus.PENDING },
		}),
		prisma.submission.count({
			where: { status: SubmissionStatus.APPROVED },
		}),
		prisma.submission.count({
			where: { status: SubmissionStatus.REJECTED },
		}),
	]);

	return {
		users: {
			total: totalUsers,
			students: {
				total: totalStudents,
				active: activeStudents,
			},
			mentors: {
				total: totalMentors,
				active: activeMentors,
				pendingApproval: pendingMentors,
				rejected: rejectedMentors,
				blocked: blockedMentors,
			},
		},
		submissions: {
			total: totalSubmissions,
			pending: pendingSubmissions,
			approved: approvedSubmissions,
			rejected: rejectedSubmissions,
		},
	};
};

export const AdminServices = {
	getAllMentors,
	getMentorById,
	updateMentorStatus,
	getDashboardStats,
};
