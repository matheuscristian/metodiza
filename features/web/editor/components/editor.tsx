"use client";

import {
    getFileContent,
    saveFile,
} from "@/features/web/editor/actions/editorActions";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Link from "@tiptap/extension-link";
import {
    Editor as TipTapEditor,
    EditorProvider,
    BubbleMenu,
    useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Strikethrough } from "lucide-react";
import cn from "@/libs/utils/cn";

const extensions = [
    StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        hardBreak: { keepMarks: true },
    }),
    Link.configure({
        autolink: true,
    }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Placeholder.configure({
        placeholder: "Começe digitando algo brilhante...",
    }),
];

export default function Editor({ fileId }: { fileId: string }) {
    const [content, setContent] = useState<string | null>(null);
    const timeout = useRef<NodeJS.Timeout>({} as NodeJS.Timeout);

    useEffect(() => {
        getFileContent(fileId).then(setContent);
    }, [fileId]);

    function handleUpdate({ editor }: { editor: TipTapEditor }) {
        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            saveFile(fileId, editor.getHTML());
        }, 300);
    }

    return (
        content !== null && (
            <EditorProvider
                content={content}
                onUpdate={handleUpdate}
                editorContainerProps={{
                    className: "w-full h-screen",
                }}
                editorProps={{
                    attributes: {
                        class: "prose prose-invert prose-sm p-3 focus-visible:outline-0 size-full min-w-full",
                    },
                }}
                extensions={extensions}
            >
                <div>
                    <BubbleMenu editor={null}>
                        <CustomBubbleMenu />
                    </BubbleMenu>
                </div>
            </EditorProvider>
        )
    );
}

function CustomBubbleMenu() {
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
