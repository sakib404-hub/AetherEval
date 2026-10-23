import { z } from "zod";

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

export const MentorValidation = {
	registerAsMentorValidationSchema,
};

export type TRegisterAsMentorPayload = z.infer<
	typeof registerAsMentorValidationSchema
>;
