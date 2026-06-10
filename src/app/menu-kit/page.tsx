import { Download, FileText } from "lucide-react";
"use client";

import { motion } from "framer-motion";
import { Download, FileText, ArrowRight } from "lucide-react";

export default function MenuKit() {
  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Menu Kit.</h1>
          <p className="text-gray-400 text-lg">Download our current seasonal offerings and event packages in PDF format.</p>
        </motion.div>
      </section>

      <section className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-light border border-white/5 p-10 rounded-3xl flex flex-col items-start group"
          >
            <div className="bg-white/10 p-4 rounded-2xl text-white mb-6"><FileText size={32} /></div>
            <h3 className="text-2xl font-bold mb-2">Winter Tasting Menu</h3>
            <p className="text-gray-400 mb-8 text-sm">Updated January 2026. Includes wine pairings and allergen information.</p>
            <button className="mt-auto inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform w-full justify-center">
              <Download size={18} /> Download PDF (2.4 MB)
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-light border border-white/5 p-10 rounded-3xl flex flex-col items-start group"
          >
            <div className="bg-white/10 p-4 rounded-2xl text-white mb-6"><FileText size={32} /></div>
            <h3 className="text-2xl font-bold mb-2">Private Events & Catering</h3>
            <p className="text-gray-400 mb-8 text-sm">Complete overview of banquet capacities, catering packages, and A/V equipment.</p>
            <button className="mt-auto inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform w-full justify-center">
              <Download size={18} /> Download PDF (3.1 MB)
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
