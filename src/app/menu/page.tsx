"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = ["Starters", "Mains", "Desserts", "Drinks"];

const menuItems = {
  Starters: [
    { name: "Truffle Arancini", desc: "Crispy risotto balls, wild mushroom, black truffle aioli.", price: "$18", img: "/restaurant_food_1.png" },
    { name: "Wagyu Carpaccio", desc: "Thinly sliced wagyu beef, capers, parmesan, cold-pressed olive oil.", price: "$24", img: "/restaurant_food_1.png" },
    { name: "Lobster Bisque", desc: "Rich lobster broth, cognac cream, tarragon.", price: "$22", img: "/restaurant_food_1.png" },
  ],
  Mains: [
    { name: "Pan-Seared Scallops", desc: "Cauliflower purée, crispy pancetta, brown butter.", price: "$38", img: "/restaurant_food_1.png" },
    { name: "Dry-Aged Ribeye", desc: "28-day dry-aged beef, roasted garlic mash, peppercorn sauce.", price: "$65", img: "/restaurant_food_1.png" },
    { name: "Wild Mushroom Risotto", desc: "Arborio rice, porcini, parmesan crisp, white truffle oil.", price: "$32", img: "/restaurant_food_1.png" },
  ],
  Desserts: [
    { name: "Dark Chocolate Fondant", desc: "Liquid center, Madagascar vanilla bean ice cream.", price: "$16", img: "/restaurant_food_1.png" },
    { name: "Lemon Basil Tart", desc: "Meringue kisses, raspberry coulis.", price: "$14", img: "/restaurant_food_1.png" },
  ],
  Drinks: [
    { name: "Smoked Old Fashioned", desc: "Bourbon, hickory smoke, angostura bitters.", price: "$18", img: "/restaurant_food_1.png" },
    { name: "Aurora Signature Gin", desc: "Botanical gin, elderflower, cucumber, tonic.", price: "$16", img: "/restaurant_food_1.png" },
  ]
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Mains");

  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">The Menu</h1>
          <p className="text-gray-400 text-lg">A curated selection of seasonal delicacies.</p>
        </motion.div>
      </section>

      {/* Menu Filter */}
      <section className="max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-surface-light border border-white/5 rounded-full w-max mx-auto"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? "bg-white text-black shadow-md" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {menuItems[activeCategory as keyof typeof menuItems].map((item, i) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-surface-light border border-white/5 p-6 rounded-[2rem] group hover:bg-white/5 transition-colors flex gap-6 items-center"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-white text-gray-100 transition-colors pr-4">{item.name}</h3>
                  <span className="bg-white/10 text-white font-bold px-3 py-1 rounded-full text-xs shrink-0">{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
