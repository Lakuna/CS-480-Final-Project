import Link from "../Link";
import type { Props } from "../../scripts/Props";
import style from "./topnav.module.scss";

export default function Topnav({ className, ...props }: Props<HTMLElement>) {
	const topnavClassName = style["topnav"];

	const fullClassName = topnavClassName
		? className
			? `${topnavClassName} ${className}`
			: topnavClassName
		: className;

	return (
		<nav className={fullClassName} {...props}>
			<ul>
				<li>
					<Link href="/">{"Index"}</Link>
				</li>
			</ul>
		</nav>
	);
}
