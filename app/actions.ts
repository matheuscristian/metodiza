"use server";

import makeConnection from "@/lib/db";
import person, { Person } from "@/model/person";
import { z } from "zod";

function flattenErrorKeys<t, U>(
    errors: z.ZodFormattedError<t, U>,
    prefix = ""
): Array<{ path: string; message: string }> {
    return Object.keys(errors).flatMap((key) => {
        if (key === "_errors") {
            return [];
        }
        const path = prefix ? `${prefix}.${key}` : key;
        const errorValue = (errors as Record<string, unknown>)[key];
        if (typeof errorValue === "object" && errorValue !== null && Object.keys(errorValue).length > 1) {
            return flattenErrorKeys(errorValue as z.ZodFormattedError<t, U>, path);
        } else {
            return { path, message: (errorValue as never)["_errors"][0] };
        }
    });
}

const personSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório!" }),
    age: z.coerce.number().min(1, { message: "Idade é obrigatória!" }),
    address: z.object({
        street: z.string().min(1, { message: "Rua é obrigatória!" }),
        city: z.string().min(1, { message: "Cidade é obrigatória!" }),
        state: z.string().min(1, { message: "Estado é obrigatório!" }),
    }),
});

export async function createPerson(data: Person) {
    const parseResult = personSchema.safeParse(data);
    if (!parseResult.success) {
        return flattenErrorKeys(parseResult.error.format());
    }
    try {
        return (await makeConnection(async () => await person.create(data)))._id.toString();
    } catch (error) {
        console.error(error);
        return null;
    }
}
