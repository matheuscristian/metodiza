import makeConnection from "@/lib/db";
import note, { Note } from "@/model/note.model";
import { redirect } from "next/navigation";
import AutoGrowTextarea from "./AutoGrowTextArea";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ uuid: string }>;
    searchParams: { name: string | undefined };
}) {
    const { uuid } = await params;
    const { name } = await searchParams;

    if (!name) {
        return null;
    }

    const noteEntry = await makeConnection(async () => (await note.findOne({ uuid }).exec()) as Note | undefined);

    if (!noteEntry) {
        await makeConnection(async () => await note.create({ uuid, content: "" }));
        return redirect("#");
    }

    return (
        <>
            <h1 className="font-bold mb-7 text-3xl">{name}</h1>
            <AutoGrowTextarea defaultValue={noteEntry.content} uuid={uuid} />
        </>
    );
}
