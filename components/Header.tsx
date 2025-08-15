
import React from 'react';
import { LogData } from '../types';

interface HeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  logs: LogData;
  onBack?: () => void;
}

const ChevronLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ArrowLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ currentDate, onPrevMonth, onNextMonth, logs, onBack }) => {
  const handleExport = () => {
    const sortedLogs = Object.entries(logs).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime());

    let csvContent = "data:text/csv;charset=utf-8,data,status\n";
    sortedLogs.forEach(([date, status]) => {
      const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');
      const statusText = status === 'DRY' ? 'seco' : 'molhado';
      csvContent += `${formattedDate},${statusText}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "diario_do_xixi.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="mb-4">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center flex-1">
            {onBack && (
                <button onClick={onBack} className="p-2 -ml-2 mr-2 rounded-full hover:bg-blue-100 transition-colors" aria-label="Voltar">
                    <ArrowLeftIcon />
                </button>
            )}
            <button onClick={onPrevMonth} className="p-2 rounded-full hover:bg-blue-100 transition-colors" aria-label="Mês anterior">
                <ChevronLeftIcon />
            </button>
        </div>
        
        <h1 className="text-2xl font-bold text-blue-800 text-center mx-4 whitespace-nowrap">
          {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
        </h1>

        <div className="flex items-center justify-end flex-1">
            <button onClick={onNextMonth} className="p-2 rounded-full hover:bg-blue-100 transition-colors" aria-label="Próximo mês">
                <ChevronRightIcon />
            </button>
        </div>
      </div>
      <div className="text-center mt-2">
        <button 
          onClick={handleExport}
          disabled={Object.keys(logs).length === 0}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Exportar CSV
        </button>
      </div>
    </header>
  );
};
