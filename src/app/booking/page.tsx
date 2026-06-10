"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  // Mock calendar data (1 = unavailable, 2 = limited, 3 = available)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let status = 3; // default available
    if (day % 7 === 0 || day % 13 === 0) status = 1; // some unavailable
    if (day % 5 === 0) status = 2; // some limited
    return { day, status };
  });

  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Reservations.</h1>
          <p className="text-gray-400 text-lg">Secure your table at Aurora.</p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Availability Calendar Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-surface-light border border-white/10 p-8 rounded-3xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><CalendarIcon /> Availability</h3>
              <span className="text-sm font-bold text-gray-400">June 2026</span>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="text-center text-xs font-bold text-gray-500 uppercase">{d}</div>
              ))}
              {/* empty offset days */}
              <div></div><div></div>
              
              {daysInMonth.map(({ day, status }) => (
                <button 
                  key={day}
                  disabled={status === 1}
                  onClick={() => setSelectedDate(day)}
                  className={`relative aspect-square flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                    status === 1 ? 'opacity-30 cursor-not-allowed text-gray-600' :
                    selectedDate === day ? 'bg-white text-black scale-110 shadow-lg z-10' :
                    'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  {day}
                  {status !== 1 && (
                    <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${status === 3 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4 text-xs font-bold text-gray-400 bg-black/50 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> Available</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Limited</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-600" /> Full</div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface-light border border-white/10 p-8 md:p-12 rounded-3xl"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Selected Date</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={selectedDate ? `June ${selectedDate}, 2026` : "Please select a date"} 
                      className={`bg-black border rounded-2xl p-4 transition-colors w-full ${selectedDate ? 'border-green-500/50 text-white' : 'border-white/10 text-gray-500'}`} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Time</label>
                    <input type="time" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 ml-2">Party Size</label>
                  <select className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full appearance-none">
                    {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num} {num === 1 ? "Guest" : "Guests"}</option>)}
                  </select>
                </div>
                
                {selectedDate && (
                  <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl flex items-center gap-4 text-sm text-green-400">
                    <CheckCircle2 className="shrink-0" size={24} />
                    <span>Time slots are available for this date. Complete your booking below.</span>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button type="button" disabled={!selectedDate} className={`font-bold py-4 px-10 rounded-full transition-transform flex items-center gap-2 w-full md:w-auto justify-center ${selectedDate ? 'bg-white text-black hover:scale-105 cursor-pointer' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}>
                    Find a Table <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface-light border border-white/10 p-8 rounded-3xl flex-1"
            >
              <h3 className="text-xl font-bold mb-4 text-white tracking-tight flex items-center gap-2"><Info size={20}/> Important Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-1">Dress Code</h4>
                  <p className="text-gray-500 text-sm">Smart elegant. Jackets are preferred.</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-1">Cancellation</h4>
                  <p className="text-gray-500 text-sm">24 hours notice required to avoid $50 fee.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
