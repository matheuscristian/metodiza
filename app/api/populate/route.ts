import connectToDatabase from "@/lib/db";
import filesModel from "@/model/files.model";

export async function GET() {
    await connectToDatabase();

    await filesModel.find({}).deleteMany().orFail();

    const root = await filesModel.create({ name: "root", type: "folder", path: "/" });

    const abacate = await filesModel.create({
        name: "Abacate",
        type: "folder",
        parent: root.id,
        path: "/Abacate/",
    });

    await filesModel.create({
        name: "Queijo Minas",
        type: "file",
        content: "Hummmmm",
        parent: abacate.id,
        path: "/Abacate/Queijo Minas",
    });

    await filesModel.create({
        name: "Cafezinho",
        type: "file",
        content: "adoro",
        parent: root.id,
        path: "/Cafezinho",
    });

    return new Response(JSON.stringify(await filesModel.find({}).orFail()), {
        headers: { "Content-Type": "application/json" },
    });
}
