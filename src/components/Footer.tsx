"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-surface-light pt-20 pb-10 border-t border-white/10 font-sans w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 md:col-span-1">
            <h3 className="text-3xl font-bold tracking-tight text-white">Aurora.</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A highly curated dining experience focusing on seasonal ingredients, precision, and modern aesthetics.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><FaFacebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><FaInstagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors"><FaTwitter size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">The Menu</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/banquet" className="hover:text-white transition-colors">Private Dining</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-white/50 shrink-0 mt-0.5" />
                <span>123 Culinary Blvd, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-white/50 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-white/50 shrink-0" />
                <span>hello@aurora.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for seasonal menus and exclusive event invitations.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-black border border-white/10 rounded-xl px-4 py-3 w-full text-sm focus:outline-none focus:border-white/30 text-white transition-colors" />
              <button className="bg-white text-black px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500">
          <p>&copy; {new Date().getFullYear()} Aurora. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
