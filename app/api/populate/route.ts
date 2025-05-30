import makeConnection from "@/lib/db";
import treeEntry, { TreeEntry } from "@/model/tree-entry";
import { randomUUID } from "crypto";

export async function GET() {
    const entries: Array<TreeEntry> = [
        {
            name: "_marker_",
            uuid: randomUUID(),
            path: "/abacate",
        },
        {
            name: "queijinho mineiro",
            uuid: randomUUID(),
            path: "/abacate",
        },
        {
            name: "cafezinho",
            uuid: randomUUID(),
            path: "/",
        },
        {
            name: "_marker_",
            uuid: randomUUID(),
            path: "/abacate/test",
        },
        {
            name: "hello, world",
            uuid: randomUUID(),
            path: "/abacate/test",
        },
    ];

    await makeConnection(async () => {
        await treeEntry.deleteMany({}).exec();
        await treeEntry.create(entries);
    });

    return new Response("", { status: 200 });
}
