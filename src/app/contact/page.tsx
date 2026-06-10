"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 bg-black min-h-screen pb-32 px-4 md:px-8 font-sans text-white selection:bg-white selection:text-black">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Contact.</h1>
          <p className="text-gray-400 text-lg">We would love to hear from you. Get in touch with our team.</p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Contact Info Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-surface-light border border-white/5 p-10 rounded-3xl flex-1">
              <h2 className="text-3xl font-bold mb-8 tracking-tight">Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl text-white"><MapPin size={24} /></div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Location</h3>
                    <p className="text-gray-400 text-sm">123 Culinary Blvd<br/>Gourmet District, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl text-white"><Phone size={24} /></div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Reservations</h3>
                    <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl text-white"><Mail size={24} /></div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Email</h3>
                    <p className="text-gray-400 text-sm">hello@aurora.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl text-white"><Clock size={24} /></div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Hours</h3>
                    <p className="text-gray-400 text-sm">Mon-Thu: 17:00 - 22:00<br/>Fri-Sat: 17:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Google Map Example */}
            <div className="h-64 w-full bg-surface-light border border-white/10 flex items-center justify-center rounded-3xl overflow-hidden relative shadow-lg">
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

          {/* Contact Form Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-surface-light border border-white/5 p-10 md:p-16 rounded-3xl"
          >
            <h3 className="text-3xl font-bold mb-8 tracking-tight">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
                <input type="email" placeholder="Email Address" className="bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors w-full" />
              </div>
              <select className="w-full bg-black border border-white/10 rounded-2xl p-4 text-gray-400 focus:outline-none focus:border-white/30 transition-colors appearance-none">
                <option value="" disabled selected>Subject</option>
                <option value="general">General Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="careers">Careers</option>
              </select>
              <textarea rows={6} placeholder="How can we help you?" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-white/30 transition-colors"></textarea>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                  Send Message <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
