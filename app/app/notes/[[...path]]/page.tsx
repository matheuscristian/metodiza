export default async function Page({ params }: { params: { path: string[] } }) {
    const { path } = await params;

    if (path === undefined) {
        return <></>;
    }

    const sanitizedPath = path.map((v) => decodeURIComponent(v));

    return <div>{sanitizedPath.pop()}</div>;
}
