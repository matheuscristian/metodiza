import Explorer from "@/features/web/explorer/components/explorer";

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex size-full items-start justify-start">
            <Explorer />
            {children}
        </div>
    );
}
