"use client";

import {
    createEntry,
    deleteFolder,
    renameEntry,
} from "@/features/web/explorer/actions/entryActions";
import useFolderStore from "@/features/web/explorer/stores/folderStore";
import { swalGetValue } from "@/features/web/explorer/utils/helpers";

export default function useFolderContextMenu(id: string, parent: string) {
    const fetchFolder = useFolderStore((s) => s.fetchFolder);

    const setOpenState = useFolderStore((s) => s.setOpenState);

    async function handleCreateFile() {
        const { value: name, isConfirmed } = await swalGetValue("Nova nota");

        if (!isConfirmed) return;

        if (!name) throw new Error("Couldn't retrieve input");

        await createEntry(name, id, "file");

        fetchFolder(id);
        setOpenState(id, true);
    }

    async function handleCreateFolder() {
        const { value: name, isConfirmed } = await swalGetValue("Nova pasta");

        if (!isConfirmed) return;

        if (!name) throw new Error("Couldn't retrieve input");

        await createEntry(name, id, "folder");

        fetchFolder(id);
        setOpenState(id, true);
    }

    async function handleRenameFolder() {
        const { value: name, isConfirmed } =
            await swalGetValue("Renomear pasta");

        if (!isConfirmed) return;

        if (!name) throw new Error("Couldn't retrieve input");

        await renameEntry(id, name);

        fetchFolder(parent);
    }

    async function handleDeleteFolder() {
        await deleteFolder(id);

        fetchFolder(parent);
    }

    return [
        handleCreateFile,
        handleCreateFolder,
        handleRenameFolder,
        handleDeleteFolder,
    ];
}
