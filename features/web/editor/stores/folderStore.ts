import {
    getChildrenOf,
    getRootId,
} from "@/features/web/editor/actions/treeActions";
import { FolderStore } from "@/types/features/web/editor/stores/folderStore";
import { create } from "zustand";

const useFolderStore = create<FolderStore>((set, get) => ({
    folders: {},

    getFolder(id) {
        return get().folders[id];
    },

    async fetchFolder(id) {
        if (!id) {
            id = await getRootId();
        }

        const children = await getChildrenOf(id);

        set((s) => ({ folders: { ...s.folders, [id]: children } }));
    },
}));

export default useFolderStore;
