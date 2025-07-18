import { ContextMenuStore } from "@/types/libs/contextMenu/stores/contextMenuStore";
import { create } from "zustand";

const useContextMenuStore = create<ContextMenuStore>((set, get) => ({
    position: null,
    component: null,
    target: null,
    contextMenuRegistry: {},

    getPosition() {
        return get().position;
    },

    setPosition(_position) {
        set(() => ({ position: _position }));
    },

    setComponent(name) {
        set((s) => ({
            component: s.contextMenuRegistry[name ?? ""] ? name : null,
        }));
    },

    getTarget() {
        return get().target;
    },

    setTarget(_target) {
        set(() => ({ target: _target }));
    },

    register(name, component) {
        set((state) => ({
            contextMenuRegistry: {
                ...state.contextMenuRegistry,
                [name]: component,
            },
        }));
    },

    render() {
        const { component, contextMenuRegistry } = get();

        if (!component) return () => null;

        return contextMenuRegistry[component];
    },
}));

export default useContextMenuStore;
