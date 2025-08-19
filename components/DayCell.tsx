
import React from 'react';
import { LogStatus } from '../types';
import { SunIcon, RainIcon, CloudIcon } from './Icons';

interface DayCellProps {
  date: Date;
  status: LogStatus | null;
  onClick: () => void;
}

export const DayCell: React.FC<DayCellProps> = ({ date, status, onClick }) => {
  const today = new Date();
  const isToday = today.toDateString() === date.toDateString();
  const isFutureDate = date > today;
  
  const getIcon = () => {
    switch (status) {
      case LogStatus.Dry:
        return <SunIcon />;
      case LogStatus.Wet:
        return <RainIcon />;
      default:
        return <CloudIcon />;
    }
  };

  return (
    <div
      onClick={isFutureDate ? undefined : onClick}
      className={`relative flex flex-col items-center justify-center aspect-square rounded-lg transition-all duration-300 transform 
        ${!isFutureDate && 'cursor-pointer hover:scale-105 hover:shadow-xl'}
        ${status === LogStatus.Dry ? 'bg-yellow-100' : ''}
        ${status === LogStatus.Wet ? 'bg-blue-200' : ''}
        ${!status ? 'bg-gray-100' : ''}
        ${isFutureDate ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}
      `}
    >
      <span 
        className={`absolute top-1 right-2 text-sm font-bold 
          ${isToday ? 'text-red-500' : 'text-gray-500'}
          ${status === LogStatus.Dry ? 'text-yellow-800' : ''}
          ${status === LogStatus.Wet ? 'text-blue-800' : ''}
        `}
      >
        {date.getDate()}
      </span>
      <div className="w-1/2 h-1/2">
        {getIcon()}
      </div>
    </div>
  );
};
