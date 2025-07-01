import cn from "@/libs/utils/cn";
import { useCurrentEditor } from "@tiptap/react";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    Underline,
} from "lucide-react";

const iconSize = 15;

export default function CustomBubbleMenu() {
    const editor = useCurrentEditor();

    return (
        <div className="bg-border rounded-md flex items-center justify-center [&>div]:cursor-pointer [&>div]:first:rounded-l-md [&>div]:last:rounded-r-md [&>div]:hover:bg-accent-primary/5 [&>div]:p-2">
            <div
                className={cn(
                    "p-3",
                    editor.editor?.isActive("bold") && "!bg-accent-focus/15",
                )}
                onClick={() =>
                    editor.editor?.chain().focus().toggleBold().run()
                }
            >
                <Bold size={iconSize} />
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
                <Italic size={iconSize} />
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
                <Strikethrough size={iconSize} />
            </div>
            <div
                className={cn(
                    "p-3",
                    editor.editor?.isActive("underline") &&
                        "!bg-accent-focus/15",
                )}
                onClick={() =>
                    editor.editor?.chain().focus().toggleUnderline().run()
                }
            >
                <Underline size={iconSize} />
            </div>
            <hr className="h-[25px] w-[1px] border-0 bg-white/10" />
            <div
                className={cn(
                    "p-3",
                    editor.editor?.isActive("bulletList") &&
                        "!bg-accent-focus/15",
                )}
                onClick={() =>
                    editor.editor?.chain().focus().toggleBulletList().run()
                }
            >
                <List size={iconSize} />
            </div>
            <div
                className={cn(
                    "p-3",
                    editor.editor?.isActive("orderedList") &&
                        "!bg-accent-focus/15",
                )}
                onClick={() =>
                    editor.editor?.chain().focus().toggleOrderedList().run()
                }
            >
                <ListOrdered size={iconSize} />
            </div>
        </div>
    );
}
