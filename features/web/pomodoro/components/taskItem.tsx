"use client";
import { useState } from "react";
import Image from "next/image";

export default function TaskItem({
    name,
    cycles,
    total,
    onDelete,
    onIncrement,
    onEdit,
    onSelect,
    isSelected,
}: {
    name: string;
    cycles: { duration: number; completedAt: Date }[];
    total: number;
    onDelete?: () => void;
    onIncrement?: () => void;
    onEdit?: (updated: { name: string; total: number }) => void;
    onSelect?: () => void;
    isSelected?: Boolean;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editaNome, seteditaNome] = useState(name);
    const [editaNumCiclos, setEditaNumCiclos] = useState(total);
    const done = cycles.length;
    const handleSave = () => {
        if (!editaNome.trim() || editaNumCiclos < done) return;
        onEdit?.({ name: editaNome.trim(), total: editaNumCiclos });
        setIsEditing(false);
    };
    if (isEditing) {
        return (
            <div className="mb-2 rounded-lg px-4 py-2 text-white">
                <input
                    type="text"
                    value={editaNome}
                    onChange={(e) => seteditaNome(e.target.value)}
                    className="mb-2 w-full rounded bg-gray-700 px-4 py-2 text-sm text-white"
                    placeholder="Nome da tarefa"
                />
                <input
                    type="number"
                    min={done}
                    value={editaNumCiclos}
                    onChange={(e) => setEditaNumCiclos(Number(e.target.value))}
                    className="mb-2 w-full rounded bg-gray-700 px-4 py-2 text-sm text-white"
                    placeholder="Total de ciclos"
                />
                <div className="flex justify-end gap-4 text-sm">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="text-cyan-400 hover:text-cyan-200"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onSelect}
            className={`mx-auto w-full max-w-lg cursor-pointer px-4 ${
                isSelected ? "bg-[#1f2127]" : ""
            }`}
        >
            <div className="mb-2 flex w-full items-center space-x-4 rounded-lg px-4 py-2 text-white">
                <div className="min-w-0 flex-1">
                    <p className="flex items-center space-x-2 font-medium">
                        {name}
                        {done >= total && (
                            <Image
                                src="/svg/Concluido.svg"
                                alt="tarefa concluida"
                                width={17}
                                height={17}
                                className="ml-1 cursor-pointer"
                            />
                        )}
                        {isSelected && done < total && (
                            <Image
                                src="/svg/naoConcluido.svg"
                                alt="tarefa nao concluida"
                                width={17.5}
                                height={17}
                                className="ml-1 cursor-pointer"
                            />
                        )}
                    </p>
                    <p className="text-sm text-gray-400">
                        {done}/{total} ciclos
                    </p>
                </div>
                <div className="flex space-x-2">
                    {onIncrement && done < total && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onIncrement();
                            }}
                            title="Adicionar ciclo"
                        >
                            <Image
                                src="/svg/buttonaddCiclo.svg"
                                alt="Adicionar ciclo"
                                width={19}
                                height={19}
                                className="ml-1 cursor-pointer"
                            />
                        </button>
                    )}
                    {onEdit && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                            }}
                            title="Editar"
                        >
                            <Image
                                src="/svg/buttonEditar.svg"
                                alt="editar tarefa"
                                width={19}
                                height={19}
                                className="ml-1 cursor-pointer"
                            />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            title="Excluir"
                        >
                            <Image
                                src="/svg/buttonDelete.svg"
                                alt="apagar tarefa"
                                width={19}
                                height={19}
                                className="ml-1 cursor-pointer"
                            />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
