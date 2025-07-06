import { entry } from "@/libs/db/prisma";

export interface FolderStore {
    folders: Record<string, entry[] | undefined>;
    fetching: Record<string, boolean>;
    opened: Record<string, boolean>;

    getFolder(id: string): entry[] | undefined;
    getFolders(): Record<string, entry[] | undefined>;
    fetchFolder(id: string | undefined): Promise<void>;

    getOpenState(id: string): boolean | undefined;
    setOpenState(id: string, value: boolean): void;
}
