
import React from 'react';
import { DayCell } from './DayCell';
import { LogData } from '../types';

interface CalendarProps {
  currentDate: Date;
  logs: LogData;
  onSelectDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ currentDate, logs, onSelectDate }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => <div key={`blank-${i}`} />);

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNumber = i + 1;
    const date = new Date(year, month, dayNumber);
    const dateKey = date.toISOString().split('T')[0];
    const status = logs[dateKey] || null;
    
    return (
      <DayCell
        key={dayNumber}
        date={date}
        status={status}
        onClick={() => onSelectDate(date)}
      />
    );
  });
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-blue-700 mb-2">
        {weekdays.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {blanks}
        {days}
      </div>
    </div>
  );
};
