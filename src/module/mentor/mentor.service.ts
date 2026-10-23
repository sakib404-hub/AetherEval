import bcrypt from "bcryptjs";
import status from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utility/AppError";
import { config } from "../../config/config";
import { Role, UserStatus } from "../../../prisma/generated/prisma/enums";
import { TRegisterAsMentorPayload } from "./mentor.validation";

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

export const MentorServices = {
	registerAsMentor,
};
