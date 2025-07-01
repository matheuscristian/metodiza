import Tree from "@/features/web/editor/components/tree";

export default function Explorer() {
    return (
        <div className="w-[280px] bg-surface">
            <div className="p-3">
                <span className="text-sm text-text-muted uppercase">Notas</span>
            </div>
            <Tree />
        </div>
    );
}
