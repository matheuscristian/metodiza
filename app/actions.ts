"use server";

import makeConnection from "@/lib/db";
import person, { Person } from "@/model/person";

export async function createPerson(data: Person) {
    return (await makeConnection(async () => await person.create(data)))._id.toString();
}
