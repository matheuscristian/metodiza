import makeConnection from "@/lib/db";
import person from "@/model/person";
import { NextResponse } from "next/server";

export async function GET() {
    const people = await makeConnection(async () => await person.find().limit(20));
    return NextResponse.json(people);
}
