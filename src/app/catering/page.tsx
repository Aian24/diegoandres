"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Catering() {
  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Catering.</h1>
          <p className="text-gray-400 text-lg">Bring the Aurora experience to your chosen venue.</p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden group"
          >
            <Image
              src="/restaurant_food_1.png"
              alt="Catering Platter"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-light border border-white/5 p-10 md:p-16 rounded-3xl flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold mb-6 tracking-tight">Exquisite Dining, Anywhere.</h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg">
              Our off-site catering service delivers the same uncompromising quality and presentation that you would experience in our dining room. 
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Packages</h3>
              <ul className="space-y-3">
                {["Cocktail Reception", "Buffet Style Dining", "Plated Multi-Course Dinner", "Interactive Food Stations"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-white shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-light border border-white/5 p-10 md:p-16 rounded-3xl"
        >
          <h3 className="text-3xl font-bold mb-8 tracking-tight">Inquiry Form</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Your Name" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
            <input type="email" placeholder="Email Address" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
            <input type="date" className="bg-black border border-white/10 rounded-2xl p-4 text-gray-400 focus:outline-none focus:border-white/30 transition-colors w-full" />
            <input type="number" placeholder="Guest Count" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
            <textarea rows={4} placeholder="Event Details" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full md:col-span-2"></textarea>
            
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                Submit Inquiry <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
