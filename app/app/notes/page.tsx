export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ id: string | null; }>;
}) {
    const { id } = await searchParams;

    if (!id) {
        return null;
    }

    return  <h1>Hello, World</h1>
}
