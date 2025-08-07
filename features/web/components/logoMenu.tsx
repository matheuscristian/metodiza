import Link from "next/link";

export default function LogoMenu() {
    return (
        <div className="[&>div]:hover:bg-accent-primary/5 flex [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:px-3 [&>div]:py-2">
            <div>
                <Link href="/logout">Sair</Link>
            </div>
        </div>
    );
}
