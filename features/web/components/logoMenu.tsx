import { LogOut } from "lucide-react";
import Link from "next/link";

export default function LogoMenu() {
    return (
        <div className="[&>div]:hover:bg-accent-primary/5 flex [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:p-3">
            <div>
                <Link href="/logout">
                    <LogOut size={15} />
                </Link>
            </div>
        </div>
    );
}
