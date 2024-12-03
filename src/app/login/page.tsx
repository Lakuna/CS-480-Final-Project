"use client";

import { authenticate } from "../../scripts/actions";
import { useActionState } from "react";

export default function Page() {
	const [state, formAction, isPending] = useActionState(authenticate, void 0);

	return (
		<>
			<h1>Log In</h1>
			<hr />
			<form action={formAction}>
				<label htmlFor="email">{"Email address: "}</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="john.doe@example.com"
					required
				/>
				<input type="submit" value="Log in" disabled={isPending} />
			</form>
			{state && <p>{state}</p>}
		</>
	);
}
