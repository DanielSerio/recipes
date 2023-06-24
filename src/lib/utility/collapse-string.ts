export default function collapseString(value: string, showLeading = 6, showTrailing = 6) {
	if (value.trim().length < showLeading + showTrailing) return value;
	return `${value.slice(0, showLeading)}...${value.slice(value.length - showTrailing)}`;
}
