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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPerson } from "./actions";

const schema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório!" }),
    age: z.coerce.number().min(1, { message: "Idade é obrigatória!" }),
    address: z.object({
        street: z.string().min(1, { message: "Rua é obrigatória!" }),
        city: z.string().min(1, { message: "Cidade é obrigatória!" }),
        state: z.string().min(1, { message: "Estado é obrigatório!" }),
    }),
});

export default function Home() {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
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

    function onSubmit(data: z.infer<typeof schema>) {
        createPerson(data);
    }

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
            <AlertDialog open={form.formState.isSubmitSuccessful} onOpenChange={() => form.reset()}>
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
        </Form>
    );
}
