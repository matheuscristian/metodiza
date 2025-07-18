import { ComponentType } from "react";

export type Position = {
    x: number;
    y: number;
};

export interface ContextMenuStore {
    position: Position | null;
    component: string | null;
    target: HTMLElement | null;
    contextMenuRegistry: Record<string, ComponentType>;

    getPosition(): Position | null;
    setPosition(position: Position | null): void;

    setComponent(name: string | null): void;

    getTarget(): HTMLElement | null;
    setTarget(target: HTMLElement | null): void;

    register(name: string, component: ComponentType): void;
    render(): ComponentType;
}
