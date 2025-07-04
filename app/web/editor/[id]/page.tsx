import Editor from "@/features/web/editor/components/editor";

export default async function EditorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <Editor fileId={id} />;
}
