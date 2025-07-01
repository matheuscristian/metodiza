import { files } from "@/libs/db/prisma";

export interface FolderStore {
    folders: Record<string, files[] | undefined>;

    getFolder(id: string): files[] | undefined;
    fetchFolder(id: string | undefined): Promise<void>;
}
