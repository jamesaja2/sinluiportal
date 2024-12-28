import React from 'react';
import calendar from '../assets/calendar.png';

const CalendarSection = () => {
  const events = [
    {
      title: 'Haloha',
      description: 'Akses e-book, materi, dan tugas',
    }
  ];

  return (
    <section className="bg-[#2a2a2a] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <img src={calendar} alt="" className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Calendar</h2>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-5 h-5 text-blue-400 shrink-0">📅</div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium truncate">{event.title}</h3>
              <p className="text-sm text-gray-400">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CalendarSection;
