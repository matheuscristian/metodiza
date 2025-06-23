"use client";

import { saveNote } from "@/app/app/notes/actions";
import { useRef } from "react";
// import TextareaAutosize from "react-textarea-autosize";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./editor.css";

export default function TextArea({ content, id, name }: { content: string; id: string; name: string }) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ hardBreak: { keepMarks: true } }),
            Placeholder.configure({ placeholder: "Começe digitando algo brilhante..." }),
        ],
        content,
        autofocus: true,
        injectCSS: false,
        onUpdate(e) {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                console.log("Saving...");
                saveNote(id, e.editor.getHTML());
            }, 300);
        },
        editorProps: {
            attributes: {
                class: "min-h-[75vh] relative min-w-full focus:outline-0 prose prose-invert prose-p:my-1 prose-sm text-white prose-ul:marker:text-white",
            },
        },
    });

    return (
        <>
            <h1 className="font-bold mb-7 text-3xl select-none">{name}</h1>
            <EditorContent className="w-full" editor={editor} />
        </>
    );
}
