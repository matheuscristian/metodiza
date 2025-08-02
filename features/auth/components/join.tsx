import JoinForm from "@/features/auth/components/joinForm";
import Image from "next/image";

export default function Join() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="bg-border flex aspect-[16/9] w-[65%] justify-around rounded-xl shadow-md">
                <div className="flex grow items-center justify-center">
                    <div className="w-[50%] scale-50 lg:scale-75 2xl:scale-100">
                        <div className="mb-5">
                            <h1 className="text-2xl font-bold">
                                Criar nova conta
                            </h1>
                        </div>
                        <div className="w-full">
                            <JoinForm />
                        </div>
                    </div>
                </div>
                <div className="h-full w-[1px] bg-black/40" />
                <div className="flex items-center justify-center">
                    <Image
                        src="/svg/metodiza.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        className="size-[70%]"
                    />
                </div>
            </div>
        </div>
    );
}
