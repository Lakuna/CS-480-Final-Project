import { signOut } from "../../middleware";

export default function Page() {
	return (
		<>
			<h1>Log Out</h1>
			<hr />
			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<input type="submit" value="Log Out" />
			</form>
		</>
	);
}
