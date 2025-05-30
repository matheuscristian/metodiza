import { TreeEntry } from "@/model/tree-entry.model";

export interface TreeDirectory {
    type: "directory";
    name: string;
    path: string;
    children: Array<TreeDirectory | { type: "file"; name: string; uuid: string }>;
}

export function createPath(
    _a: Array<TreeDirectory | { type: "file"; name: string; uuid: string }>,
    path: string[],
    fullPath: string
): Array<TreeDirectory | { type: "file"; name: string; uuid: string }> {
    if (!path.length) return _a;

    const pname = path.shift() || "";
    const a = _a.find((v) => v.type === "directory" && v.name === pname);

    if (!a) {
        return createPath(
            (
                _a[
                    _a.push({
                        type: "directory",
                        name: pname,
                        path: fullPath.split(pname)[0] + pname,
                        children: [],
                    }) - 1
                ] as TreeDirectory
            ).children,
            path,
            fullPath
        );
    }

    return createPath((a as TreeDirectory).children, path, fullPath);
}

export function buildTreeFromEntries(entries: TreeEntry[], basePath: string): TreeDirectory {
    const newTree: TreeDirectory = {
        type: "directory",
        name: basePath
            .split("/")
            .filter((p) => p.length > 0)
            .pop() || "error",
        path: basePath,
        children: [],
    };

    for (const entry of entries) {
        if (entry.name === "_marker_") continue;

        const _path = entry.path
            .replace(basePath, "")
            .split("/")
            .filter((v) => v.trim().length);
        const target = createPath(newTree.children, _path, entry.path);

        target.push({
            type: "file",
            name: entry.name,
            uuid: entry.uuid || "",
        });
    }

    return newTree;
}
