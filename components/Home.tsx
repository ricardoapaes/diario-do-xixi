
import React from 'react';
import { LogData, LogStatus } from '../types';
import { SunIcon, RainIcon, CloudIcon } from './Icons';

interface HomeProps {
    logs: LogData;
    onUpdateStatus: (date: Date, status: LogStatus | null) => void;
    onNavigateToCalendar: () => void;
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).replace(/^\w/, c => c.toUpperCase());
};

const getDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const Home: React.FC<HomeProps> = ({ logs, onUpdateStatus, onNavigateToCalendar }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const todayKey = getDateKey(today);
    const todayStatus = logs[todayKey] ?? null;

    const last5Days = Array.from({ length: 5 }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (i + 1));
        return date;
    });
    
    return (
        <div className="min-h-screen font-sans antialiased text-gray-800 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm">
                
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-800">Diário do Xixi</h1>
                    <p className="text-gray-500">Olá! Como foi seu dia hoje?</p>
                </header>

                <main className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <h2 className="font-bold text-gray-700 text-center mb-1">Hoje</h2>
                    <p className="text-center text-blue-600 font-semibold mb-6">{formatDate(today)}</p>

                    <div className="flex justify-around gap-4 mb-4">
                        <button 
                            onClick={() => onUpdateStatus(today, LogStatus.Dry)}
                            className={`flex flex-col items-center justify-center p-4 w-1/2 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-all transform hover:scale-105 border-4 ${todayStatus === LogStatus.Dry ? 'border-yellow-400' : 'border-transparent'}`}
                            aria-label="Dia seco"
                        >
                            <div className="w-16 h-16">
                                <SunIcon />
                            </div>
                            <span className="font-bold mt-2 text-yellow-900">Dia Seco</span>
                        </button>
                        
                        <button 
                            onClick={() => onUpdateStatus(today, LogStatus.Wet)}
                            className={`flex flex-col items-center justify-center p-4 w-1/2 bg-blue-100 rounded-xl hover:bg-blue-200 transition-all transform hover:scale-105 border-4 ${todayStatus === LogStatus.Wet ? 'border-blue-400' : 'border-transparent'}`}
                            aria-label="Fez xixi na cama"
                        >
                            <div className="w-16 h-16">
                                <RainIcon />
                            </div>
                            <span className="font-bold mt-2 text-blue-900">Xixi na Cama</span>
                        </button>
                    </div>

                    {todayStatus && (
                         <button 
                            onClick={() => onUpdateStatus(today, null)}
                            className="w-full text-sm text-center text-gray-500 hover:text-red-500 transition-colors"
                        >
                            Limpar registro de hoje
                        </button>
                    )}
                </main>

                <section className="mb-8">
                    <h3 className="font-bold text-gray-700 text-center mb-4">Últimos 5 dias</h3>
                    <div className="flex justify-center gap-2">
                        {last5Days.map(date => {
                            const dateKey = getDateKey(date);
                            const status = logs[dateKey] ?? null;
                            const dayAbbr = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace(/^\w/, c => c.toUpperCase()).replace('.', '');

                            let icon = <CloudIcon />;
                            if (status === LogStatus.Dry) icon = <SunIcon />;
                            if (status === LogStatus.Wet) icon = <RainIcon />;

                            return (
                                <div key={dateKey} className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md w-14">
                                    <span className="text-xs font-bold text-gray-600">{dayAbbr}</span>
                                    <div className="w-8 h-8 mt-1">{icon}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <footer className="text-center">
                    <button 
                        onClick={onNavigateToCalendar}
                        className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors w-full"
                    >
                        Ver Calendário Completo
                    </button>
                </footer>
            </div>
        </div>
    );
};
