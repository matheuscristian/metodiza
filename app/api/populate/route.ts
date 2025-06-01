import connectToDatabase from "@/lib/db";
import filesModel from "@/model/files.model";

export async function GET() {
    await connectToDatabase();

    await filesModel.find({}).deleteMany().orFail();

    const root = await filesModel.create({ name: "root", type: "folder" });

    const abacate = await filesModel.create({
        name: "Abacate",
        type: "folder",
        parent: root.id,
    });

    await filesModel.create({
        name: "Queijo Minas",
        type: "file",
        content: "Hummmmm",
        parent: abacate.id,
    });

    await filesModel.create({
        name: "Cafezinho",
        type: "file",
        content: "adoro",
        parent: root.id,
    });

    return new Response(JSON.stringify(await filesModel.find({}).orFail()), {
        headers: { "Content-Type": "application/json" },
    });
}
