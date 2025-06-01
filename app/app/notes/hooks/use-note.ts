import { createNote, deleteNote, renameNote } from "@/app/app/notes/actions";
import { ExplorerRef } from "@/types/explorer";
import { redirect } from "next/navigation";

export default function useNote(
    pathNoteID: string,
    openDialogInput: (title: string, defaultValue?: string) => Promise<string | null>,
    setFolderOpenState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
    childrenRefs: React.RefObject<Map<string, React.RefObject<ExplorerRef | null>>>,
    reloadTree: () => void
): [
    (noteID: string) => Promise<void>,
    (parentID: string, prevName: string) => Promise<void>,
    (noteID: string) => Promise<void>,
] {
    async function handleCreateNote(parentID: string) {
        const name = await openDialogInput("Dê um nome para esta nota");

        if (!name) {
            return;
        }

        setFolderOpenState((prev) => ({ ...prev, [parentID]: true }));

        const id = await createNote(name, parentID);

        childrenRefs.current.get(parentID)?.current?.reload();

        redirect(`/app/notes/${id}?name=${name}`);
    }

    async function handleRenameNote(noteID: string, prevName: string) {
        const name = await openDialogInput("Dê um nome para esta nota", prevName);

        if (!name) {
            return;
        }

        await renameNote(noteID, name);

        reloadTree();

        if (pathNoteID === noteID) {
            redirect(`/app/notes/${noteID}?name=${name}`);
        }
    }

    async function handleDeleteNote(noteID: string) {
        await deleteNote(noteID);

        reloadTree();

        if (pathNoteID === noteID) {
            redirect(`/app/notes/`);
        }
    }

    return [handleCreateNote, handleRenameNote, handleDeleteNote];
}
