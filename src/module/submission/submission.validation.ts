import { z } from "zod";
import { SubmissionStatus } from "../../../prisma/generated/prisma/enums";

const postSubmissionValidationSchema = z.object({
	projectName: z
		.string({ error: "Project name is required" })
		.min(1, "Project name cannot be empty")
		.trim(),
	repoUrl: z
		.string({ error: "Repository URL is required" })
		.url("Please provide a valid repository URL")
		.trim(),
	liveLink: z
		.string({ error: "Live link is required" })
		.url("Please provide a valid live link URL")
		.trim(),
	description: z
		.string({ error: "Description is required" })
		.min(1, "Description cannot be empty")
		.trim(),
	studentId: z
		.string({ error: "Student ID is required" })
		.min(1, "Student ID cannot be empty")
		.trim(),
});

export const SubmissionValidation = {
	postSubmissionValidationSchema,
	createSubmissionValidationSchema: postSubmissionValidationSchema,
};

export type TPostSubmissionPayload = z.infer<typeof postSubmissionValidationSchema>;
export type TCreateSubmissionPayload = TPostSubmissionPayload;
