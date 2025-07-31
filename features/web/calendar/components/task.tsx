import React, { useState, ChangeEvent } from 'react';

interface TaskProps {
    selectedDate: Date | null;
    onClose: () => void;
}

const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Task({ selectedDate, onClose }: TaskProps) {
    const [taskData, setTaskData] = useState({
        title: '',
        priority: false,
        location: '',
        subject: '',
        notification: '',
        description: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setTaskData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSave = () => {
        // Aqui você implementaria a lógica para salvar a tarefa
        console.log("Tarefa salva:", taskData, selectedDate);
        onClose(); // Fecha o pop-up após salvar
    };

    // Não renderiza nada se nenhuma data estiver selecionada
    if (!selectedDate) {
        return null;
    }

    // Formata a data para exibição (ex: "10 de Maio de 2025")
    const formattedDate = `${selectedDate.getDate()} de ${months[selectedDate.getMonth()]} de ${selectedDate.getFullYear()}`;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} // Fecha ao clicar fora do pop-up
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
                onClick={e => e.stopPropagation()} // Impede fechamento ao clicar dentro
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">TAREFA</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="text-center mb-4 text-cyan-600 font-medium">
                    {formattedDate}
                </div>
                
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Adicionar título"
                            value={taskData.title}
                            onChange={handleChange}
                            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="priority"
                                checked={taskData.priority}
                                onChange={handleChange}
                                className="mr-2 h-5 w-5 text-cyan-600"
                            />
                            <span>Prioridade</span>
                        </label>
                        
                        <input
                            type="text"
                            name="location"
                            placeholder="Adicionar local"
                            value={taskData.location}
                            onChange={handleChange}
                            className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Matéria"
                            value={taskData.subject}
                            onChange={handleChange}
                            className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500"
                        />
                        
                        <input
                            type="text"
                            name="notification"
                            placeholder="Adicionar notificação"
                            value={taskData.notification}
                            onChange={handleChange}
                            className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                </div>
                
                <div className="mt-6">
                    <div className="flex space-x-2 mb-2">
                        {['B', 'I', 'U', 'A', 'S', 'D'].map((btn, i) => (
                            <button 
                                key={i}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                    
                    <textarea
                        name="description"
                        placeholder="Adicionar uma descrição"
                        value={taskData.description}
                        onChange={handleChange}
                        className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                        SALVAR
                    </button>
                </div>
            </div>
        </div>
    );
}