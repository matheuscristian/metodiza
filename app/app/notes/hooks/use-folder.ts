import { createFolder, deleteFolder, hasNote, renamefolder } from "@/app/app/notes/actions";
import { ExplorerRef } from "@/types/explorer";
import { redirect } from "next/navigation";

export default function useFolder(
    pathNoteID: string,
    openDialogInput: (title: string, defaultValue?: string) => Promise<string | null>,
    setFolderOpenState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    childrenRefs: React.RefObject<Map<string, React.RefObject<ExplorerRef | null>>>,
    reloadTree: () => void
): [
    (parentID: string) => Promise<void>,
    (folderID: string, prevName: string) => Promise<void>,
    (folderID: string) => Promise<void>,
] {
    async function handleCreateFolder(parentID: string) {
        const name = await openDialogInput("Dê um nome para esta pasta");

        if (!name) {
            return;
        }

        setFolderOpenState((prev) => ({ ...prev, [parentID]: true }));

        await createFolder(name, parentID);

        childrenRefs.current.get(parentID)?.current?.reload();
    }

    async function handleRenameFolder(noteID: string, prevName: string) {
        const name = await openDialogInput("Dê um nome para esta pasta", prevName);

        if (!name) {
            return;
        }

        await renamefolder(noteID, name);

        reloadTree();
    }

    async function handleDeleteFolder(folderID: string) {
        await deleteFolder(folderID);

        reloadTree();

        if (!(await hasNote(pathNoteID))) {
            redirect("/app/notes");
        }
    }

    return [handleCreateFolder, handleRenameFolder, handleDeleteFolder];
}
