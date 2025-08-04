import Tree from "@/features/web/explorer/components/tree";

export default function Explorer() {
    return (
        <div className="bg-surface h-screen w-[280px] shrink-0">
            <div className="p-3">
                <span className="text-text-muted text-sm uppercase">Notas</span>
            </div>
            <Tree />
        </div>
    );
}
