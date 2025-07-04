export default function cn(
    ...args: (string | false | null | undefined)[]
): string {
    const filtered = args.filter((it) => typeof it === "string" && it.trim());

    return filtered.join(" ");
}
