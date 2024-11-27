import type { Props } from "../../scripts/Props";
import style from "./card-list.module.scss";

export default function CardList({
	className,
	...props
}: Props<HTMLDivElement>) {
	const cardListClassName = style["card-list"];

	const fullClassName = cardListClassName
		? className
			? `${cardListClassName} ${className}`
			: cardListClassName
		: className;

	return <div className={fullClassName} {...props} />;
}
