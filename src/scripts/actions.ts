"use server";

import { AuthError } from "next-auth";
import { createUser } from "./db";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signIn } from "../middleware";

export const signUp = async (_: string | undefined, formData: FormData) => {
	const email = formData.get("email");
	if (typeof email !== "string") {
		return "The email address field is required.";
	}

	const name = formData.get("name");
	if (typeof name !== "string") {
		return "The name field is required.";
	}

	const phone = formData.get("phone");
	if (typeof phone !== "string") {
		return "The phone number field is required.";
	}

	try {
		// eslint-disable-next-line camelcase
		await createUser({ email, name, phone, user_id: "" });
	} catch (error) {
		if (error instanceof Error) {
			return `Something went wrong: ${error.toString()}`;
		}

		return "Something went wrong.";
	}

	return "Success!";
};

export const authenticate = async (
	_: string | undefined,
	formData: FormData
) => {
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (isRedirectError(error)) {
			throw error;
		}

		if (error instanceof AuthError && error.type === "CredentialsSignin") {
			return "Invalid credentials.";
		}

		if (error instanceof Error) {
			return `Something went wrong: ${error.toString()}`;
		}

		return "Something went wrong.";
	}

	return "Success!";
};
