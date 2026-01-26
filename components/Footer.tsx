'use client';

import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#020511] text-white pt-16 pb-8 mt-auto font-body border-t border-gray-900">
      <div className="max-w-[1400px] mx-auto px-8"> 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20 text-sm">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="mb-6">
                <Image 
                    src="/logo.svg" 
                    alt="Special Graphics" 
                    width={140} 
                    height={40} 
                    className="h-auto w-auto opacity-90 brightness-0 invert" 
                />
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">The world's #1 marketplace for creative contests. Design without limits.</p>
          </div>
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press releases</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Categories</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Logo & Brand</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web & App Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business & Advertising</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clothing & Merchandise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Packaging & Label</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Magazin & Book Covers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Get a Design</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Logo Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Card</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Package/Label Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brand Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">T-Shirt Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Book Cover Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-semibold mt-2">Browse all categories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-bold text-white mb-6">Become a Designer</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Advance Package Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advance Logo Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Basics of Graphic Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Designer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap gap-4 items-center">
              <span className="font-medium">© Special Graphics</span>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <span className="hidden md:inline">|</span>
              <div className="flex gap-2 text-white">
                 <span className="font-bold cursor-pointer">English</span>
                 <span className="text-gray-500 cursor-pointer hover:text-white">Español</span>
              </div>
          </div>
          <div className="flex space-x-5">
              <Facebook className="w-4 h-4 hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-4 h-4 hover:text-pink-600 cursor-pointer transition-colors" />
              <Linkedin className="w-4 h-4 hover:text-blue-700 cursor-pointer transition-colors" />
              <Globe className="w-4 h-4 hover:text-green-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
