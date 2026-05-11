import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, User as UserIcon, LogIn, Menu, Zap } from "lucide-react";
import { useAuth } from "../App";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

export default function Navbar() {
  const { auth, isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Order Tracker", path: "/tracking" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gaming-black/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center box-glow">
              <Zap className="text-black fill-black" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              DIAMOND<span className="text-neon-blue">RUSH</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-neon-blue",
                  location.pathname === link.path ? "text-neon-blue" : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {auth.user ? (
              <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
              >
                {isAdmin ? <LayoutDashboard size={18} /> : <UserIcon size={18} />}
                <span className="text-sm font-semibold">{auth.user.name}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 bg-neon-blue text-black font-bold rounded-full hover:bg-neon-blue/90 transition-all box-glow"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
