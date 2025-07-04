import Explorer from "@/features/web/explorer/components/explorer";

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
