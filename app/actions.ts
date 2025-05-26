"use server";

interface BaseTreeEntry {
    name: string;
}

interface TreeNote extends BaseTreeEntry {
    type: "file";
    uuid: string;
}

export interface TreeDirectory extends BaseTreeEntry {
    type: "directory";
    path: string;
    children: (TreeNote | TreeDirectory)[]; // This can be only ID's in database and then populated
}

// TO-DO: make this retrieve data from the database
export async function getNotesTree(): Promise<TreeDirectory> {
    return {
        type: "directory",
        name: "root",
        path: "/",
        children: [
            {
                type: "directory",
                name: "Abacate",
                path: "/abacate",
                children: [
                    {
                        type: "file",
                        name: "Queijinho Mineiro",
                        uuid: crypto.randomUUID(),
                    },
                    {
                        type: "file",
                        name: "Cafezinho",
                        uuid: crypto.randomUUID(),
                    },
                    {
                        type: "directory",
                        name: "test",
                        path: "/abacate/test",
                        children: [
                            {
                                type: "file",
                                name: "Hello World",
                                uuid: crypto.randomUUID(),
                            },
                        ],
                    },
                ],
            },
        ],
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteNote(uuid: string): Promise<boolean> {
    // To do
    return true;
}
