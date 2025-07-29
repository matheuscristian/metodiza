import {
    getChildrenOf,
    getRootId,
} from "@/features/web/explorer/actions/treeActions";
import { FolderStore } from "@/types/features/web/explorer/stores/folderStore";
import { create } from "zustand";

const useFolderStore = create<FolderStore>((set, get) => ({
    folders: {},
    fetching: {},
    opened: {},

    getFolder(id) {
        return get().folders[id];
    },

    getFolders() {
        return get().folders;
    },

    isChildren(id, parent) {
        const folders = get().folders;
        const parentFolder = folders[parent];

        if (!parentFolder) return false;

        for (const entry of parentFolder) {
            if (entry.id === id) return true;

            if (entry.type === "folder") return this.isChildren(id, entry.id);
        }

        return false;
    },

    async fetchFolder(id) {
        if (!id) {
            id = await getRootId();
        }

        // Prevents from fetching the same folder at the same time
        if (get().fetching[id]) return;

        set((s) => ({ fetching: { ...s.fetching, [id]: true } }));

        const children = await getChildrenOf(id);

        set((s) => ({ folders: { ...s.folders, [id]: children } }));

        set((s) => ({ fetching: { ...s.fetching, [id]: false } }));
    },

    getOpenState(id) {
        return get().opened[id];
    },

    setOpenState(id, value) {
        set((s) => ({
            opened: { ...s.opened, [id]: value },
        }));
    },
}));

export default useFolderStore;
