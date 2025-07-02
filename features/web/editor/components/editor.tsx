"use client";

import {
    getFileContent,
    saveFile,
} from "@/features/web/editor/actions/editorActions";
import CustomBubbleMenu from "@/features/web/editor/components/CustomBubbleMenu";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import {
    BubbleMenu,
    EditorProvider,
    Editor as TipTapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

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
    Underline,
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
                onCreate={(editor) => {
                    editor.editor.commands.focus();
                }}
                editorContainerProps={{
                    className: "w-full h-screen",
                }}
                editorProps={{
                    attributes: {
                        class: "prose prose-invert prose-sm p-3 focus-visible:outline-0 size-full min-w-full",
                    },
                }}
                immediatelyRender={false}
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
