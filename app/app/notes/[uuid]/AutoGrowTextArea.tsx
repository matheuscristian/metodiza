"use client";

import { saveNote } from "@/app/actions";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function AutoGrowTextarea({ defaultValue, uuid }: { defaultValue: string; uuid: string }) {
    const [value, setValue] = useState(defaultValue);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();

        setValue(e.target.value);
    }

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log("Saving...");
            saveNote(value, uuid);
        }, 500);
    }, [value, uuid]);

    return (
        <TextareaAutosize
            className="w-full bg-transparent border-0 outline-none shadow-none focus:outline-none focus:ring-0 resize-none"
            defaultValue={value}
            minRows={1}
            placeholder="Começe digitando algo brilhante..."
            onChange={handleChange}
        />
    );
}
