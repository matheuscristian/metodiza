import makeConnection from "@/lib/db";
import note, { Note } from "@/model/note.model";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ uuid: string }> }) {
    const { uuid } = await params;

    const noteEntry = await makeConnection(async () => (await note.findOne({ uuid }).exec()) as Note | undefined);

    if (!noteEntry) {
        await makeConnection(async () => await note.create({ uuid, content: "New File" }));
        return redirect("#");
    }

    return <div>{noteEntry.content}</div>;
}
