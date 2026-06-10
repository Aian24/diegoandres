"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";

export default function Home() {
  const [cmsData, setCmsData] = useState({
    heroTitle: "Elevating culinary standards.",
    heroSubtitle: "A highly curated dining experience focusing on seasonal ingredients, precision, and modern aesthetics.",
    heroButton: "Book your experience",
    heroImage: "/restaurant_hero.png",
    exploreMenuTitle: "Explore the menu",
    exploreMenuDesc: "Discover our seasonal ingredients and culinary mastery.",
    exploreMenuImage: "/restaurant_food_1.png"
  });

  useEffect(() => {
    fetch("/api/cms")
      .then(res => res.json())
      .then(data => {
        if(data && !data.error) {
          setCmsData({
            ...cmsData,
            ...data
          });
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Sleek Hero Section */}
      <section className="relative pt-40 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-300">Now taking reservations for Summer</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 max-w-5xl"
          dangerouslySetInnerHTML={{ __html: cmsData.heroTitle.replace('\n', '<br/>') }}
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
        >
          {cmsData.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Link 
            href="/booking" 
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              {cmsData.heroButton} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* Modern Bento Grid Layout */}
      <section className="px-4 md:px-8 pb-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
          
          {/* Main Visual - Spans full width on mobile, 1 col on desktop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group"
          >
            <Image 
              src={cmsData.heroImage} 
              alt="Restaurant Atmosphere" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <h2 className="text-3xl font-bold mb-2">The Atmosphere</h2>
              <p className="text-gray-300">Designed for intimate conversations and unforgettable moments.</p>
            </div>
          </motion.div>

          {/* Featured Dish Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1 row-span-1 relative rounded-[2rem] overflow-hidden group"
          >
            <Image 
              src="/restaurant_food_1.png" 
              alt="Signature Dish" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full w-max mb-3">Signature</span>
              <h3 className="text-2xl font-bold">Wagyu A5</h3>
            </div>
          </motion.div>

        </div>

        {/* Location & Hours Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-light border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden group shadow-xl"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="bg-white text-black p-4 rounded-2xl shrink-0">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2 text-white">Location</h3>
                <p className="text-gray-300 mb-2">123 Culinary Blvd,<br/>Gourmet District, NY 10001</p>
                <Link href="/contact" className="text-white font-bold flex items-center gap-2 text-sm hover:text-gray-300 transition-colors">
                  Get Directions <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            {/* Google Map Example */}
            <div className="w-full h-48 md:h-full rounded-2xl overflow-hidden mt-auto border border-white/10 relative min-h-[200px]">
              <iframe 
                src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-500"
              ></iframe>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-light border border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden shadow-xl"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="bg-white text-black p-4 rounded-2xl shrink-0">
                <Clock size={32} />
              </div>
              <div className="w-full">
                <h3 className="text-3xl font-bold mb-2 text-white">Hours</h3>
                <p className="text-gray-400">Open 7 days a week for dinner service.</p>
              </div>
            </div>
            <div className="bg-black/50 rounded-2xl p-6 border border-white/5 mt-auto">
              <ul className="space-y-4 w-full">
                <li className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-300 font-medium">Monday - Thursday</span> 
                  <span className="bg-white/10 px-3 py-1 rounded-full text-white font-bold text-sm">17:00 - 22:00</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-300 font-medium">Friday - Saturday</span> 
                  <span className="bg-white/10 px-3 py-1 rounded-full text-white font-bold text-sm">17:00 - 23:00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">Sunday</span> 
                  <span className="bg-white/10 px-3 py-1 rounded-full text-white font-bold text-sm">16:00 - 21:00</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Explore Menu Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 w-full rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between group cursor-pointer relative overflow-hidden min-h-[200px]"
        >
          <Image 
            src={cmsData.exploreMenuImage} 
            alt="Explore our menu" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500 z-0" />
          
          <div className="text-center md:text-left mb-6 md:mb-0 z-10">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">{cmsData.exploreMenuTitle}</h3>
            <p className="text-gray-300 md:text-lg max-w-xl">{cmsData.exploreMenuDesc}</p>
          </div>
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform z-10 shrink-0 shadow-xl">
            <ArrowRight className="text-black" size={24} />
          </div>
          <Link href="/menu" className="absolute inset-0 z-20"><span className="sr-only">Go to menu</span></Link>
        </motion.div>

      </section>
    </div>
  );
}
