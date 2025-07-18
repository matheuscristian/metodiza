import useFolderContextMenu from "@/features/web/explorer/hooks/folderContextMenuHook";
import useContextMenuStore from "@/libs/contextMenu/stores/contextMenuStore";
import { EntryDataset } from "@/types/features/web/explorer/components/entry";
import { FilePlus, FolderPlus, PenSquare, Trash } from "lucide-react";

export default function FolderContextMenu() {
    const dataset = useContextMenuStore((s) => s.getTarget())?.dataset;

    const {
        entryId: id,
        entryParent: parent,
        entryRoot: root,
    } = dataset as EntryDataset;

    const [
        handleCreateFile,
        handleCreateFolder,
        handleRenameFolder,
        handleDeleteFolder,
    ] = useFolderContextMenu(id ?? "", parent ?? "");

    if (!dataset) return <span>Unable to load context menu</span>;

    return (
        <div className="flex [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:hover:bg-accent-primary/5 [&>div]:py-2 [&>div]:px-3">
            <div onClick={handleCreateFile}>
                <FilePlus width={15} />
            </div>
            <div onClick={handleCreateFolder}>
                <FolderPlus width={15} />
            </div>
            {!root && (
                <>
                    <div onClick={handleRenameFolder}>
                        <PenSquare width={15} />
                    </div>
                    <div onClick={handleDeleteFolder}>
                        <Trash width={15} />
                    </div>
                </>
            )}
        </div>
    );
}
