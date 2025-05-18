"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createPerson } from "./actions";
import { useState } from "react";
import { Person } from "@/model/person";

export default function Home() {
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [openLoadingDialog, setOpenLoadingDialog] = useState(false);

    const form = useForm<Person>({
        defaultValues: {
            name: "",
            age: "" as unknown as number,
            address: {
                street: "",
                city: "",
                state: "",
            },
        },
    });

    const onSubmit = async (data: Person) => {
        setOpenLoadingDialog(true);
        const res = await createPerson(data);
        setOpenLoadingDialog(false);
        if (res === null) {
            setOpenErrorDialog(true);
        } else if (typeof res === "object") {
            for (const value of res) {
                form.setError(value.path as keyof Person, value);
            }
        } else {
            setOpenSuccessDialog(true);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 justify-center items-start">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Seu nome" className="min-w-[300px]" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Idade</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" placeholder="Sua idade" className="min-w-[300px]" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Label className="text-lg font-semibold">Endereço</Label>
                <div className="flex flex-col gap-5 pl-10">
                    <FormField
                        control={form.control}
                        name="address.street"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rua</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Sua rua" className="min-w-[300px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Sua cidade" className="min-w-[300px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address.state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Sigla do seu estado" className="min-w-[300px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex justify-center items-center mt-5">
                    <Button type="submit" className="min-w-[150px]">
                        Enviar
                    </Button>
                </div>
            </form>
            <AlertDialog open={openLoadingDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Carregando...</AlertDialogTitle>
                        <AlertDialogDescription>Seus dados estão sendo enviados.</AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog
                open={openSuccessDialog}
                onOpenChange={() => {
                    form.reset();
                    setOpenSuccessDialog(false);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sucesso!</AlertDialogTitle>
                        <AlertDialogDescription>Seus dados foram enviados com sucesso!</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={openErrorDialog} onOpenChange={() => setOpenErrorDialog(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Erro</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ocorreu um erro no servidor. Não foi possível enviar seus dados!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Form>
    );
}
