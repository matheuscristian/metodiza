import { getNoteContent } from "@/app/actions";
import TextArea from "./textarea";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ uuid: string | null; name: string | null }>;
}) {
    const { uuid, name } = await searchParams;

    if (!uuid || !name) {
        return null;
    }

    const content = await getNoteContent(uuid);

    return <TextArea content={content} uuid={uuid} name={name} />;
}
