"use client";

import MonthGrid from "@/features/web/calendar/components/month";
import { makeDaysList } from "@/features/web/calendar/utils/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const months = [
    {
        label: "Janeiro",
        days: makeDaysList(31),
    },
    {
        label: "Fevereiro",
        days: makeDaysList(28),
    },
    {
        label: "Março",
        days: makeDaysList(31),
    },
    {
        label: "Abril",
        days: makeDaysList(30),
    },
    {
        label: "Maio",
        days: makeDaysList(31),
    },
    {
        label: "Junho",
        days: makeDaysList(30),
    },
    {
        label: "Julho",
        days: makeDaysList(31),
    },
    {
        label: "Agosto",
        days: makeDaysList(31),
    },
    {
        label: "Setembro",
        days: makeDaysList(30),
    },
    {
        label: "Outubro",
        days: makeDaysList(31),
    },
    {
        label: "Novembro",
        days: makeDaysList(30),
    },
    {
        label: "Dezembro",
        days: makeDaysList(31),
    },
];

export default function Calendar() {
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());

    return (
        <div className="h-screen overflow-y-auto w-full space-y-5 flex items-center">
            <div className="w-[55%] mx-auto">
                <div className="w-full flex justify-between">
                    <h1 className="text-2xl mb-5">{months[month].label}</h1>
                    <div className="[&>*]:inline-block flex w-[200px] justify-between items-center select-none">
                        <ChevronLeft
                            size={20}
                            className="cursor-pointer"
                            onClick={() =>
                                setMonth((m) => {
                                    if (m === 0) {
                                        setYear(year - 1);
                                        return 11;
                                    }

                                    return m - 1;
                                })
                            }
                        />
                        <span>
                            {months[month].label}, {year}
                        </span>
                        <ChevronRight
                            size={20}
                            className="cursor-pointer"
                            onClick={() => {
                                setMonth((m) => {
                                    if (m === 11) {
                                        setYear(year + 1);
                                        return 0;
                                    }

                                    return m + 1;
                                });
                            }}
                        />
                    </div>
                </div>
                <MonthGrid days={months[month].days} className="!size-full" />
            </div>
        </div>
    );
}
