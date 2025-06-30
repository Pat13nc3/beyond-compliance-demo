import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, FileText, Shield, Briefcase } from 'lucide-react';
import { reportingEvents } from '../../data/mockData'; // Assuming mockData is in src/data

const ReportingCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // --- Color and Icon Mapping ---
    const eventStyles = {
        'Filing': { color: 'bg-red-500', icon: <FileText size={14} /> },
        'Report': { color: 'bg-blue-500', icon: <FileText size={14} /> },
        'Audit': { color: 'bg-yellow-500', icon: <Shield size={14} /> },
        'Meeting': { color: 'bg-green-500', icon: <Briefcase size={14} /> },
        'default': { color: 'bg-gray-500', icon: <FileText size={14} /> }
    };

    // --- Memoize event processing for performance ---
    const eventsByDate = useMemo(() => {
        const groupedEvents = {};
        reportingEvents.forEach(event => {
            const eventDate = new Date(event.date + 'T00:00:00'); // Ensure local timezone
            const dateString = eventDate.toISOString().split('T')[0];
            if (!groupedEvents[dateString]) {
                groupedEvents[dateString] = [];
            }
            groupedEvents[dateString].push(event);
        });
        return groupedEvents;
    }, [reportingEvents]);

    // --- Calendar Header and Navigation ---
    const CalendarHeader = () => (
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold text-white">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                <ChevronRight size={24} />
            </button>
        </div>
    );
    
    // --- Calendar Grid ---
    const CalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="border-r border-b border-gray-700"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = date.toISOString().split('T')[0];
            const isToday = today.toDateString() === date.toDateString();
            const isSelected = selectedDate.toDateString() === date.toDateString();
            const dayEvents = eventsByDate[dateString] || [];

            days.push(
                <div
                    key={day}
                    className={`p-2 border-r border-b border-gray-700 cursor-pointer transition-colors relative ${isSelected ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
                    onClick={() => setSelectedDate(date)}
                >
                    <span className={`flex items-center justify-center h-8 w-8 rounded-full text-sm ${isToday ? 'bg-[#c0933e] text-[#1e252d] font-bold' : ''}`}>
                        {day}
                    </span>
                    <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map((event, index) => (
                            <div key={index} className={`truncate text-xs text-white p-1 rounded-md flex items-center ${eventStyles[event.type]?.color || eventStyles.default.color}`}>
                                <div className="mr-1">{eventStyles[event.type]?.icon || eventStyles.default.icon}</div>
                                {event.title}
                            </div>
                        ))}
                         {dayEvents.length > 2 && <div className="text-xs text-gray-400 text-center">+ {dayEvents.length - 2} more</div>}
                    </div>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-7 grid-rows-5 h-full">
                <div className="grid grid-cols-7 col-span-7 border-t border-l border-gray-700">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="text-center font-semibold text-gray-400 p-2 border-r border-b border-gray-700">{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 col-span-7 row-span-4 border-l border-gray-700">
                    {days}
                </div>
            </div>
        );
    };

    // --- Agenda Pane for Selected Day ---
    const AgendaPane = () => {
        const dateString = selectedDate.toISOString().split('T')[0];
        const dayEvents = eventsByDate[dateString] || [];
        return (
            <div className="bg-[#1e252d] p-6 rounded-xl lg:ml-6 mt-6 lg:mt-0">
                <h3 className="text-lg font-semibold text-white mb-4">
                    Agenda for: <span className="text-[#c0933e]">{selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </h3>
                <div className="space-y-4">
                    {dayEvents.length > 0 ? (
                        dayEvents.map((event, index) => (
                            <div key={index} className={`p-4 rounded-lg border-l-4 ${event.urgency === 'high' ? 'border-red-500' : 'border-blue-500'} bg-gray-800`}>
                                <p className="font-bold text-white">{event.title}</p>
                                <p className="text-sm text-gray-400">Type: {event.type}</p>
                                {event.urgency && <p className="text-sm text-gray-400 capitalize">Urgency: {event.urgency}</p>}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No events scheduled for this day.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white">
            <CalendarHeader />
            <div className="lg:flex">
                <div className="lg:w-2/3">
                    <CalendarGrid />
                </div>
                <div className="lg:w-1/3">
                    <AgendaPane />
                </div>
            </div>
        </div>
    );
};

export default ReportingCalendar;
