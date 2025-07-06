"use client";

import { searchFiles } from "@/features/web/explorer/actions/treeActions";
import File from "@/features/web/explorer/components/file";
import useFolderStore from "@/features/web/explorer/stores/folderStore";
import { entry } from "@prisma/client";
import { useEffect, useState } from "react";

export default function FileList({ search }: { search: string }) {
    const folders = useFolderStore((s) => s.getFolders());
    const [files, setFiles] = useState<entry[]>([]);

    useEffect(() => {
        searchFiles(search).then(setFiles);
    }, [search, folders]);

    return files.map((file) => <File key={file.id} entry={file} level={0} />);
}
