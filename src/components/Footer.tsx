import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gaming-card border-t border-white/5 pt-16 pb-8 md:pb-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Zap className="text-neon-blue" />
              <span className="text-xl font-bold tracking-tight">DIAMOND RUSH</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              The most trusted platform for Free Fire diamonds top-up. Instant delivery, secure payments, and 24/7 customer support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-blue/20 hover:text-neon-blue transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-white/60 text-sm hover:text-neon-blue transition-colors">Buy Diamonds</Link></li>
              <li><Link to="/tracking" className="text-white/60 text-sm hover:text-neon-blue transition-colors">Order Tracking</Link></li>
              <li><Link to="/faq" className="text-white/60 text-sm hover:text-neon-blue transition-colors">Diamond Guide</Link></li>
              <li><Link to="/contact" className="text-white/60 text-sm hover:text-neon-blue transition-colors">Support Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-white/60 text-sm hover:text-neon-blue transition-colors">About Us</Link></li>
              <li><Link to="/terms" className="text-white/60 text-sm hover:text-neon-blue transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-white/60 text-sm hover:text-neon-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-white/60 text-sm hover:text-neon-blue transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Get exclusive offers and promo codes.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neon-blue transition-colors"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-neon-blue text-black rounded transition-transform hover:scale-105">
                <Mail size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 Diamond Rush Store. All rights reserved. 
          </p>
          <div className="flex items-center gap-6">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="Paypal" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed" />
            <img src="https://img.icons8.com/color/48/000000/bitcoin.png" alt="Crypto" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed" />
          </div>
        </div>
      </div>
    </footer>
  );
}
