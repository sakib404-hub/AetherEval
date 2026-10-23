import { z } from "zod";

const signUpValidationSchema = z.object({
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
		.min(6, "Password must be at least 6 characters long")
});

const loginValidationSchema = z.object({
	email: z
		.string({ error: "Email is required" })
		.email("Please provide a valid email address")
		.trim(),
	password: z
		.string({ error: "Password is required" })
		.min(1, "Password cannot be empty"),
});

export const AuthValidation = {
	signUpValidationSchema,
	loginValidationSchema,
};

export type TSignUpPayload = z.infer<typeof signUpValidationSchema>;
export type TLoginPayload = z.infer<typeof loginValidationSchema>;
