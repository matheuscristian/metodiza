import Link from "next/link";

export default function Page() {
    return (
        <p className="p-10">
            Não há nada aqui ainda:{" "}
            <Link href="/app/notes" className="underline text-cyan-500 hover:text-cyan-400">
                Clique para acessar o app.
            </Link>
        </p>
    );
}
