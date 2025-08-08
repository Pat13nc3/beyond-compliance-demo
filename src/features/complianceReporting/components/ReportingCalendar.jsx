// src/features/complianceReporting/components/ReportingCalendar.jsx

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { reportingEvents as mockEvents } from '../../../data/mockData.js';

const ReportingCalendar = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1));
  const [selectedDay, setSelectedDay] = useState(15);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const getEventsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const selectedDayEvents = getEventsForDay(selectedDay);

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday = day === 10 && currentDate.getMonth() === 6 && currentDate.getFullYear() === 2025;
      days.push(
        <div
            key={day}
            className={`text-center p-2 rounded-lg cursor-pointer transition-colors
                ${selectedDay === day
                    ? 'bg-blue-600 text-white font-bold'
                    : isToday
                    ? 'bg-gray-700 text-white'
                    : 'theme-text-secondary hover:bg-gray-700'
                }`
            }
            onClick={() => setSelectedDay(day)}
        >
          {day}
          <div className="flex justify-center space-x-1 mt-1">
            {dayEvents.map(event => (
              <div key={event.title} className={`h-1.5 w-1.5 rounded-full ${
                event.type === 'Filing' ? 'bg-red-400' :
                event.type === 'Meeting' ? 'bg-green-400' :
                'bg-blue-400'
              }`}></div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-2 theme-bg-card theme-text-primary p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 theme-text-primary"><ChevronLeft size={20} /></button>
          <h2 className="text-xl font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 theme-text-primary"><ChevronRight size={20} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm theme-text-secondary font-medium">
          {daysOfWeek.map(day => <div key={day} className="text-center p-2">{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1">
          {renderCalendarDays()}
        </div>
      </div>

      <div className="theme-bg-card theme-text-primary p-6 rounded-xl shadow-lg">
        <h3 className="font-bold text-lg mb-4">Agenda for: <span className="theme-text-highlight-color">{daysOfWeek[new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay).getDay()]} {selectedDay} {monthNames[currentDate.getMonth()]}</span></h3>
        <div className="space-y-3">
          {selectedDayEvents.length > 0 ? selectedDayEvents.map(event => (
            <button
              key={event.title}
              onClick={() => onEventClick(event)}
              className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <p className="font-semibold">{event.title}</p>
              <p className="text-xs theme-text-secondary">Type: {event.type}</p>
            </button>
          )) : (
            <p className="theme-text-secondary text-sm">No events scheduled for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportingCalendar;