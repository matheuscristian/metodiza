import Explorer from "@/features/web/editor/components/explorer";

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-2">
            <Explorer />
            {children}
        </div>
    );
}
