import useFileContextMenu from "@/features/web/explorer/hooks/fileContextMenuHook";
import useContextMenuStore from "@/libs/contextMenu/stores/contextMenuStore";
import { EntryDataset } from "@/types/features/web/explorer/components/entry";
import { PenSquare, Trash } from "lucide-react";

export default function FileContextMenu() {
    const dataset = useContextMenuStore((s) => s.getTarget())?.dataset;

    const { entryId: id, entryParent: parent } = dataset as EntryDataset;

    const [handleRenameFile, handleDeleteFile] = useFileContextMenu(
        id ?? "",
        parent ?? "",
    );

    if (!dataset) return <span>Unable to load context menu</span>;

    return (
        <div className="flex [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:hover:bg-accent-primary/5 [&>div]:py-2 [&>div]:px-3">
            <div onClick={handleRenameFile}>
                <PenSquare width={15} />
            </div>
            <div onClick={handleDeleteFile}>
                <Trash width={15} />
            </div>
        </div>
    );
}
