
import React from 'react';
import { LogStatus } from '../types';
import { SunIcon, RainIcon } from './Icons';

interface StatusModalProps {
  date: Date;
  onClose: () => void;
  onUpdateStatus: (date: Date, status: LogStatus | null) => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({ date, onClose, onUpdateStatus }) => {
  const formattedDate = date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">Como foi o dia?</h2>
        <p className="text-gray-600 mb-6">{formattedDate}</p>
        
        <div className="flex justify-around gap-4 mb-4">
          <button 
            onClick={() => onUpdateStatus(date, LogStatus.Dry)}
            className="flex flex-col items-center justify-center p-4 w-1/2 bg-yellow-300 rounded-xl hover:bg-yellow-400 transition-colors transform hover:scale-105"
            aria-label="Dia seco"
          >
            <div className="w-16 h-16">
              <SunIcon />
            </div>
            <span className="font-bold mt-2 text-yellow-900">Dia Seco</span>
          </button>
          
          <button 
            onClick={() => onUpdateStatus(date, LogStatus.Wet)}
            className="flex flex-col items-center justify-center p-4 w-1/2 bg-blue-300 rounded-xl hover:bg-blue-400 transition-colors transform hover:scale-105"
            aria-label="Fez xixi na cama"
          >
             <div className="w-16 h-16">
              <RainIcon />
            </div>
            <span className="font-bold mt-2 text-blue-900">Xixi na Cama</span>
          </button>
        </div>
        
        <button 
          onClick={() => onUpdateStatus(date, null)}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Limpar registro
        </button>
      </div>
    </div>
  );
};
