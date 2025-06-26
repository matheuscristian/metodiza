"use client";

import {
    Sidebar,
    SidebarProvider,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import Explorer from "./components/explorer";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus2, FolderPlus, Search } from "lucide-react";
import { createNote, createFolder, getRootID } from "@/app/app/notes/actions";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";
import { ExplorerRef } from "@/types/explorer";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dialogTitleRef = useRef("");
    const dialogInputDefaultValue = useRef<string>("");

    const resolverRef = useRef<((value: string | null) => void) | null>(null);

    const [rootID, setRootID] = useState<string | null>(null);
    const rootRef = useRef<ExplorerRef | null>(null);

    useEffect(() => {
        getRootID().then(setRootID);
    }, []);

    async function handleCreateNote() {
        const name = await openDialogInput("Dê um nome para esta nota");

        if (!name) {
            return;
        }

        const id = await createNote(name, rootID as string);

        rootRef.current?.reload();

        redirect(`/app/notes/${id}?name=${name}`);
    }

    async function handleCreateFolder() {
        const name = await openDialogInput("Dê um nome para esta pasta");

        if (!name) {
            return;
        }

        await createFolder(name, rootID as string);

        rootRef?.current?.reload();
    }

    async function openDialogInput(title: string, defaultValue?: string): Promise<string | null> {
        dialogTitleRef.current = title;
        dialogInputDefaultValue.current = defaultValue ?? "";

        setDialogOpen(true);

        return new Promise((resolve) => {
            resolverRef.current = resolve;
        });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const value = inputRef.current?.value ?? "";
        setDialogOpen(false);
        resolverRef.current?.(value);
        resolverRef.current = null;
    }

    if (!rootID) {
        return null;
    }

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>{dialogTitleRef.current}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid mb-3">
                            <Input
                                type="text"
                                name="target"
                                ref={inputRef}
                                defaultValue={dialogInputDefaultValue.current}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        if (resolverRef.current) {
                                            resolverRef.current(null);
                                            resolverRef.current = null;
                                        }
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit">confirmar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="flex justify-start">
                <SidebarProvider className="w-fit">
                    <Sidebar collapsible="none" className="h-screen">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel className="flex-col h-fit">
                                    <div className="flex justify-between w-full">
                                        <Label>Notas</Label>
                                        <div className="flex gap-3">
                                            <FilePlus2
                                                width={15}
                                                className="opacity-50 hover:opacity-85 hover:cursor-pointer"
                                                onClick={handleCreateNote}
                                            />
                                            <FolderPlus
                                                width={15}
                                                className="opacity-50 hover:opacity-85 hover:cursor-pointer"
                                                onClick={handleCreateFolder}
                                            />
                                        </div>
                                    </div>
                                    <div className="relative my-5 w-full">
                                        <Search
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                                            size={15}
                                        />
                                        <Input
                                            className="!bg-[#ddd] text-muted placeholder:text-muted-foreground focus-visible:ring-0 border-0"
                                            placeholder="Pesquisar"
                                            type="text"
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <Explorer
                                        id={rootID ?? undefined}
                                        openDialogInput={openDialogInput}
                                        ref={rootRef}
                                        search={search}
                                    />
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </SidebarProvider>
                <ScrollArea className="max-h-screen w-full">
                    <div className="px-20 py-10 max-w-full w-full">{children}</div>
                </ScrollArea>
            </div>
        </>
    );
}
