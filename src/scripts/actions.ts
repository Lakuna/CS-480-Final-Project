"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signIn } from "../middleware";

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
