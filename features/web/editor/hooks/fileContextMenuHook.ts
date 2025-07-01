"use client";

import {
    deleteFile,
    renameEntry,
} from "@/features/web/editor/actions/entryActions";
import useFolderStore from "@/features/web/editor/stores/folderStore";
import swalGetValue from "@/features/web/editor/utils/swalGetValue";

export default function useFileContextMenu(id: string, parent: string) {
    const fetchFolder = useFolderStore((s) => s.fetchFolder);

    async function handleRenameFile() {
        const { value: name, isConfirmed } =
            await swalGetValue("Renomear Arquivo");

        if (!isConfirmed) return;

        if (!name) throw new Error("Couldn't retrieve input");

        await renameEntry(id, name);

        fetchFolder(parent);
    }

    async function handleDeleteFile() {
        await deleteFile(id);

        fetchFolder(parent);
    }

    return [handleRenameFile, handleDeleteFile];
}
