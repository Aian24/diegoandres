"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Music, Wine, ArrowRight } from "lucide-react";

export default function Banquet() {
  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Private Dining.</h1>
          <p className="text-gray-400 text-lg">Host your special events in an atmosphere of pure elegance.</p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-light border border-white/5 p-10 md:p-16 rounded-3xl flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">The Grand Room</h2>
            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              Our Grand Room is the perfect venue for weddings, corporate events, and large celebrations. Featuring high ceilings, custom chandeliers, and a private bar, it offers an exclusive experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-2xl">
                <Users className="text-white" size={24} />
                <span>Capacity: 150 Seated / 200 Cocktail</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-2xl">
                <Music className="text-white" size={24} />
                <span>State-of-the-art A/V System & Private DJ Booth</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-2xl">
                <Wine className="text-white" size={24} />
                <span>Dedicated Event Coordinator & Private Bar</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[600px] md:h-auto rounded-3xl overflow-hidden group"
          >
            <Image
              src="/restaurant_hero.png"
              alt="Banquet Facility"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white text-black p-12 text-center rounded-3xl flex flex-col items-center justify-center group"
        >
          <h3 className="text-3xl font-bold mb-4 tracking-tight">Inquire About Your Event</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our events team to discuss availability, customized menus, and how we can make your occasion truly unforgettable.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            Contact Events Team <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
