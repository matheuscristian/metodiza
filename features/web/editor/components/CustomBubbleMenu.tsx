import cn from "@/libs/utils/cn";
import { useCurrentEditor } from "@tiptap/react";
import { Bold, Italic, Strikethrough } from "lucide-react";

export default function CustomBubbleMenu() {
    const editor = useCurrentEditor();

    return (
        <div className="bg-border rounded-md flex [&>div]:cursor-pointer [&>div]:first:rounded-l-md [&>div]:last:rounded-r-md [&>div]:hover:bg-accent-primary/5 [&>div]:py-2 [&>div]:px-3">
            <div
                className={cn(
                    "p-3",
                    editor.editor?.isActive("bold") && "!bg-accent-focus/15",
                )}
                onClick={() =>
                    editor.editor?.chain().focus().toggleBold().run()
                }
            >
                <Bold size={12} />
            </div>
            <div
                className={cn(
                    "p-3",
                    editor.editor?.isActive("italic") && "!bg-accent-focus/15",
                )}
                onClick={() =>
                    editor.editor?.chain().focus().toggleItalic().run()
                }
            >
                <Italic size={12} />
            </div>
            <div
                className={cn(
                    "p-3",
                    editor.editor?.isActive("strike") && "!bg-accent-focus/15",
                )}
                onClick={() =>
                    editor.editor?.chain().focus().toggleStrike().run()
                }
            >
                <Strikethrough size={12} />
            </div>
        </div>
    );
}
