import React from 'react';
import { Calendar, BookOpen } from 'lucide-react';

const CalendarSection = () => {
  const events = [
    {
      title: 'Haloha',
      description: 'Cobababababa',
      icon: BookOpen
    }
  ];

  return (
    <section className="bg-[#2a2a2a] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Calendar</h2>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-4">
            <event.icon className="w-5 h-5 text-blue-400 shrink-0" />
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