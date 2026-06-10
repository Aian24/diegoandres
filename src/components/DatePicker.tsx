"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function DatePicker({ 
  value, 
  onChange, 
  placeholder = "Select date" 
}: { 
  value: Date | null, 
  onChange: (d: Date) => void, 
  placeholder?: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const handleSelectDate = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(newDate);
    setIsOpen(false);
  };

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative" ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-transparent rounded-lg px-3 py-2 cursor-pointer transition-colors w-36 hover:bg-white/5 ${isOpen ? "bg-white/5" : ""}`}
      >
        <CalendarIcon size={16} className={value ? "text-white" : "text-gray-500"} />
        <span className={`text-sm font-medium ${value ? "text-white" : "text-gray-500"} truncate`}>
          {value ? formatDate(value) : placeholder}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 p-5 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 w-72 ring-1 ring-white/5"
          >
            <div className="flex justify-between items-center mb-6">
              <button onClick={prevMonth} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"><ChevronLeft size={18} /></button>
              <div className="font-bold text-sm text-white tracking-wide">
                {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
              </div>
              <button onClick={nextMonth} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"><ChevronRight size={18} /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-3">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-bold text-gray-500 py-1">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = value && value.getDate() === day && value.getMonth() === viewDate.getMonth() && value.getFullYear() === viewDate.getFullYear();
                const isToday = new Date().getDate() === day && new Date().getMonth() === viewDate.getMonth() && new Date().getFullYear() === viewDate.getFullYear();
                
                return (
                  <button 
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all mx-auto
                      ${isSelected ? "bg-white text-black font-bold scale-110 shadow-lg" : 
                        isToday ? "border border-white/20 text-white hover:bg-white/10 font-bold" : 
                        "text-gray-300 hover:bg-white/10 hover:text-white"}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between">
               <button onClick={() => { onChange(null as any); setIsOpen(false); }} className="text-xs font-bold text-gray-500 hover:text-white transition-colors px-2 py-1 rounded">Clear</button>
               <button onClick={() => { onChange(new Date()); setIsOpen(false); }} className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg">Today</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
