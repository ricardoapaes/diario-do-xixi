
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Calendar } from './components/Calendar';
import { StatusModal } from './components/StatusModal';
import { Home } from './components/Home';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LogData, LogStatus } from './types';

function App(): React.ReactNode {
  const [view, setView] = useState<'home' | 'calendar'>('home');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logs, setLogs] = useLocalStorage<LogData>('bedwetting-logs', {});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const navigateToCalendar = useCallback(() => setView('calendar'), []);
  const navigateToHome = useCallback(() => setView('home'), []);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);
  
  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedDate(null);
  }, []);

  const handleUpdateStatus = useCallback((date: Date, status: LogStatus | null) => {
    const dateKey = date.toISOString().split('T')[0];
    setLogs(prevLogs => {
      const newLogs = { ...prevLogs };
      if (status === null) {
        delete newLogs[dateKey];
      } else {
        newLogs[dateKey] = status;
      }
      return newLogs;
    });
  }, [setLogs]);
  
  const handleModalUpdateStatus = (date: Date, status: LogStatus | null) => {
    handleUpdateStatus(date, status);
    handleCloseModal();
  };

  if (view === 'home') {
    return (
      <Home 
        logs={logs}
        onUpdateStatus={handleUpdateStatus}
        onNavigateToCalendar={navigateToCalendar}
      />
    );
  }

  return (
    <div className="min-h-screen font-sans antialiased text-gray-800">
      <div className="container mx-auto max-w-lg p-4">
        <Header 
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          logs={logs}
          onBack={navigateToHome}
        />
        <main>
          <Calendar 
            currentDate={currentDate}
            logs={logs}
            onSelectDate={handleSelectDate}
          />
        </main>
         <footer className="text-center text-sm text-gray-500 mt-8">
            <p>Clique em um dia para registrar.</p>
            <p>Sol = Dia Seco, Chuva = Xixi na Cama</p>
        </footer>
      </div>
      {selectedDate && (
        <StatusModal 
          date={selectedDate}
          onClose={handleCloseModal}
          onUpdateStatus={handleModalUpdateStatus}
        />
      )}
    </div>
  );
}

export default App;
