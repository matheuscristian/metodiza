"use server";

import makeConnection from "@/lib/db";
import treeEntry, { TreeEntry } from "@/model/tree-entry";

interface TreatedBaseTreeEntry {
    name: string;
    uuid: string;
}

interface TreeNote extends TreatedBaseTreeEntry {
    type: "file";
}

interface TreeDirectory extends TreatedBaseTreeEntry {
    type: "directory";
    children: TreatedTreeEntry[]; // This can be only ID's in database and then populated
}

export type TreatedTreeEntry = TreeNote | TreeDirectory;

// TO-DO: make this retrieve data from the database
export async function getNotesTree(): Promise<TreatedTreeEntry[]> {
    const documents = await makeConnection(async () => (await treeEntry.find({}).exec()) as TreeEntry[]);

    const res: TreatedTreeEntry[] = [];

    for (const document of documents) {
        const path = document.path.split("/").filter((v) => v.trim() != "");
        for (const directory of path) {
            if ()
        }
    }

    // return [
    //     {
    //         type: "directory",
    //         name: "Abacate",
    //         uuid: crypto.randomUUID(),
    //         children: [
    //             {
    //                 type: "file",
    //                 name: "Queijinho Mineiro",
    //                 uuid: crypto.randomUUID(),
    //             },
    //             {
    //                 type: "file",
    //                 name: "Cafezinho",
    //                 uuid: crypto.randomUUID(),
    //             },
    //             {
    //                 type: "directory",
    //                 name: "test",
    //                 uuid: crypto.randomUUID(),
    //                 children: [
    //                     {
    //                         type: "file",
    //                         name: "Hello World",
    //                         uuid: crypto.randomUUID(),
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteNote(uuid: string): Promise<boolean> {
    // To do
    return true;
}
