"use client";

import { saveNote } from "@/app/actions";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function TextArea({ content, uuid, name }: { content: string; uuid: string; name: string }) {
    const [value, setValue] = useState("Carregando...");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log("Saving...");
            saveNote(e.target.value, uuid);
        }, 300);

        setValue(e.target.value);
    }

    useEffect(() => {
        setValue(content);
    }, [content]);

    return (
        <>
            <h1 className="font-bold mb-7 text-3xl">{name}</h1>
            <TextareaAutosize
                className="w-full bg-transparent border-0 outline-none shadow-none focus:outline-none focus:ring-0 resize-none"
                value={value}
                minRows={1}
                placeholder="Começe digitando algo brilhante..."
                onChange={handleChange}
            />
        </>
    );
}
