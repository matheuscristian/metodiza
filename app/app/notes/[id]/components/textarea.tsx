"use client";

import { saveNote } from "@/app/app/notes/actions";
import { useRef } from "react";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import ExtLink from "@tiptap/extension-link";
import ExtUnderline from "@tiptap/extension-underline";
import "./editor.css";
import { Bold, Italic, List, ListOrdered, Strikethrough, Underline } from "lucide-react";

export default function TextArea({ content, id, name }: { content: string; id: string; name: string }) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const showFloating = useRef<boolean>(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ hardBreak: { keepMarks: true }, heading: { levels: [1, 2] } }),
            Placeholder.configure({ placeholder: "Começe digitando algo brilhante..." }),
            ExtUnderline,
            ExtLink.configure({
                autolink: true,
                openOnClick: true,
                linkOnPaste: true,
            }),
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
                class: "min-h-[75vh] relative min-w-full focus:outline-0 prose prose-invert prose-p:my-1 prose-a:cursor-pointer prose-a:hover:text-gray-200 prose-md prose-h1:text-[1.25em] prose-h2:text-[1rem] text-gray-100 prose-ul:marker:text-white",
            },
        },
        onSelectionUpdate() {
            showFloating.current = true;
        },
    });

    return (
        <>
            <h1 className="font-bold mb-7 text-3xl select-none">{name}</h1>
            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ placement: "top" }}>
                    <div className="floating-menu">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive("bold") ? "is-active" : ""}
                        >
                            <Bold width={15} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive("italic") ? "is-active" : ""}
                        >
                            <Italic width={15} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={editor.isActive("underline") ? "is-active" : ""}
                        >
                            <Underline width={15} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive("strike") ? "is-active" : ""}
                        >
                            <Strikethrough width={15} />
                        </button>
                        <div className="separator" />
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive("bulletList") ? "is-active" : ""}
                        >
                            <List width={15} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive("orderedList") ? "is-active" : ""}
                        >
                            <ListOrdered width={15} />
                        </button>
                    </div>
                </BubbleMenu>
            )}
            <EditorContent className="w-full" editor={editor} />
        </>
    );
}
