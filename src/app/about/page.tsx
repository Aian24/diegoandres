"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Our Story.</h1>
          <p className="text-gray-400 text-lg">A passion for gastronomy meets a dedication to excellence.</p>
        </motion.div>
      </section>

      {/* Bento Layout for Story */}
      <section className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-light border border-white/5 p-10 md:p-16 rounded-3xl flex flex-col justify-center"
          >
            <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-6 uppercase tracking-widest">The Beginning</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Born from a dream.</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Aurora began as a simple idea: to create a dining experience that engages all the senses. Founded in 2010 by visionary chefs, our restaurant has grown from a humble eatery to a landmark of culinary innovation.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-auto rounded-3xl overflow-hidden group"
          >
            <Image
              src="/restaurant_hero.png"
              alt="Restaurant Interior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
          </motion.div>
        </div>

        {/* Values Bento */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "Excellence", desc: "We strive for perfection in every dish we plate and every interaction we have." },
            { title: "Sustainability", desc: "We are committed to ethical sourcing and minimizing our environmental footprint." },
            { title: "Innovation", desc: "We respect tradition, but we are never bound by it. Creativity is our compass." }
          ].map((value, i) => (
            <div key={i} className="bg-surface-light border border-white/5 p-8 rounded-3xl hover:bg-white/5 transition-colors">
              <h3 className="text-2xl font-bold mb-3 tracking-tight">{value.title}</h3>
              <p className="text-gray-400 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
