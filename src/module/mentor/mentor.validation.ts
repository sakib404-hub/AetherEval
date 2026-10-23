import { z } from "zod";
import { SubmissionStatus } from "../../../prisma/generated/prisma/enums";

const registerAsMentorValidationSchema = z.object({
	name: z
		.string({ error: "Name is required" })
		.min(1, "Name cannot be empty")
		.trim(),
	email: z
		.string({ error: "Email is required" })
		.email("Please provide a valid email address")
		.trim(),
	password: z
		.string({ error: "Password is required" })
		.min(6, "Password must be at least 6 characters long"),
	expertise: z
		.string({ error: "Expertise is required" })
		.min(1, "Expertise cannot be empty")
		.trim(),
	bio: z
		.string({ error: "Bio is required" })
		.min(1, "Bio cannot be empty")
		.trim(),
	portfolioUrl: z
		.string({ error: "Portfolio URL is required" })
		.url("Please provide a valid portfolio URL")
		.trim(),
});

const updateSubmissionStatusValidationSchema = z
	.object({
		status: z.enum(
			[SubmissionStatus.APPROVED, SubmissionStatus.REJECTED],
			{
				error: "Status must be either APPROVED or REJECTED",
			},
		),
		reviewComment: z.string().trim().optional(),
		rejectionReason: z.string().trim().optional(),
	})
	.refine(
		(data) => {
			if (data.status === SubmissionStatus.REJECTED) {
				const comment =
					(data.reviewComment || data.rejectionReason || "").trim();
				return comment.length > 0;
			}
			return true;
		},
		{
			message:
				"Rejection reason is required when rejecting a submission.",
			path: ["reviewComment"],
		},
	);

export const MentorValidation = {
	registerAsMentorValidationSchema,
	updateSubmissionStatusValidationSchema,
	updateSubmissionSatusValidationSchema: updateSubmissionStatusValidationSchema,
};

export type TRegisterAsMentorPayload = z.infer<
	typeof registerAsMentorValidationSchema
>;

export type TUpdateSubmissionStatusPayload = z.infer<
	typeof updateSubmissionStatusValidationSchema
>;
