import "@/features/home/styles/home.css";
import { Notebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <div className="flex items-center px-8 py-4">
                <Image
                    src="/svg/metodiza.svg"
                    width={35}
                    height={35}
                    alt="Logo"
                    className="mr-12"
                />
                <nav className="space-x-5">
                    <Link
                        href="/web/editor"
                        className="text-text-muted hover:text-text-primary"
                    >
                        Editor
                    </Link>
                </nav>
                <Link
                    href="/login"
                    className="border-border ml-auto cursor-pointer rounded-sm border-1 px-3 py-2 text-sm brightness-85 will-change-transform hover:brightness-100 active:scale-[98%]"
                >
                    Entrar gratuitamente
                </Link>
            </div>

            <main className="flex flex-col justify-between gap-12 px-84">
                <section className="flex justify-between gap-52 py-38">
                    <div className="flex h-full flex-col gap-5">
                        <h1 className="text-5xl">
                            Organização mais fácil do que nunca
                        </h1>
                        <p className="text-text-muted text-balance">
                            Todas as ferramentas que você precisa em só um
                            lugar, aumente seu foco e melhore seu aprendizado
                            com as ferramentas da Metodiza.
                        </p>
                        <Link
                            href="/login"
                            className="bg-accent-secondary block w-max rounded-md px-12 py-2 will-change-transform hover:brightness-85 active:scale-[98%]"
                        >
                            Começe já
                        </Link>
                    </div>
                    <div className="flex min-w-[300px] justify-end">
                        <Image
                            src="/svg/metodiza.svg"
                            alt="logo"
                            width={300}
                            height={300}
                        />
                    </div>
                </section>

                <section className="flex justify-between py-24">
                    <div className="bg-surface border-border flex w-[300px] justify-between gap-5 rounded-md border px-5 py-4">
                        <div className="max-w-[180px] space-y-2">
                            <h1 className="text-xl font-bold">Anote</h1>
                            <p className="text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </div>
                        <div className="my-auto">
                            <Notebook size={45} strokeWidth={1} />
                        </div>
                    </div>

                    <div className="bg-surface border-border flex w-[300px] justify-between gap-5 rounded-md border px-5 py-4">
                        <div className="max-w-[180px] space-y-2">
                            <h1 className="text-xl font-bold">Anote</h1>
                            <p className="text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </div>
                        <div className="my-auto">
                            <Notebook size={45} strokeWidth={1} />
                        </div>
                    </div>

                    <div className="bg-surface border-border flex w-[300px] justify-between gap-5 rounded-md border px-5 py-4">
                        <div className="max-w-[180px] space-y-2">
                            <h1 className="text-xl font-bold">Anote</h1>
                            <p className="text-sm">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                            </p>
                        </div>
                        <div className="my-auto">
                            <Notebook size={45} strokeWidth={1} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
