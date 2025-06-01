import { getNoteContent, hasNote } from "@/app/app/notes/actions";
import TextArea from "./components/textarea";

export default async function Page({
    searchParams,
    params,
}: {
    searchParams: Promise<{ name: string | null }>;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!(await hasNote(id))) {
        return null;
    }

    const { name } = await searchParams;

    if (!id || !name) {
        return null;
    }

    const content = (await getNoteContent(id)) ?? "";

    return <TextArea content={content} id={id} name={name} />;
}
