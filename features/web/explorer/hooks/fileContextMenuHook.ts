"use client";

import {
    deleteFile,
    renameEntry,
} from "@/features/web/explorer/actions/entryActions";
import useFolderStore from "@/features/web/explorer/stores/folderStore";
import { swalGetValue } from "@/features/web/explorer/utils/helpers";
import { redirect, usePathname } from "next/navigation";

export default function useFileContextMenu(id: string, parent: string) {
    const fetchFolder = useFolderStore((s) => s.fetchFolder);

    const pathName = usePathname();

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

        if (pathName.includes(id)) {
            redirect("/web/editor");
        }
    }

    return [handleRenameFile, handleDeleteFile];
}
