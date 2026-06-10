"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    { src: "/restaurant_hero.png", title: "The Grand Dining Room", desc: "Main floor" },
    { src: "/restaurant_food_1.png", title: "A5 Wagyu", desc: "Signature Dish" },
    { src: "/restaurant_hero.png", title: "Private Banquet", desc: "Event space" },
    { src: "/restaurant_food_1.png", title: "Truffle Caviar", desc: "Appetizer" },
    { src: "/restaurant_hero.png", title: "The Bar", desc: "Craft Cocktails" },
    { src: "/restaurant_food_1.png", title: "Scallops", desc: "Seafood selection" },
  ];

  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Gallery.</h1>
          <p className="text-gray-400 text-lg">A visual journey through our culinary creations.</p>
        </motion.div>
      </section>

      <section className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
          {images.map((img, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative group overflow-hidden rounded-[2rem] ${idx === 0 || idx === 3 ? "md:col-span-2" : ""}`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-100" />
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">{img.desc}</p>
                <h3 className="text-2xl font-bold text-white">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
