import Explorer from "@/features/web/editor/components/explorer";

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-start items-start size-full">
            <Explorer />
            {children}
        </div>
    );
}
