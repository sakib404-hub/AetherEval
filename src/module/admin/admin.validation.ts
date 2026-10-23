import { z } from "zod";
import { UserStatus } from "../../../prisma/generated/prisma/enums";

const updateMentorStatusValidationSchema = z
	.object({
		status: z.enum(
			[
				UserStatus.ACTIVE,
				UserStatus.REJECTED,
				UserStatus.BLOCKED,
				UserStatus.PENDING_APPROVAL,
			],
			{
				error:
					"Valid status is required (ACTIVE, REJECTED, BLOCKED, PENDING_APPROVAL)",
			},
		),
		rejectionReason: z.string().trim().optional(),
	})
	.refine(
		(data) => {
			if (data.status === UserStatus.REJECTED) {
				return (
					typeof data.rejectionReason === "string" &&
					data.rejectionReason.trim().length > 0
				);
			}
			return true;
		},
		{
			message: "Rejection reason is required when rejecting a mentor.",
			path: ["rejectionReason"],
		},
	);

export const AdminValidation = {
	updateMentorStatusValidationSchema,
};

export type TUpdateMentorStatusPayload = z.infer<
	typeof updateMentorStatusValidationSchema
>;
