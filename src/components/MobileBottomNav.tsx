import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Search, User } from "lucide-react";
import { cn } from "../lib/utils";

export default function MobileBottomNav() {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Shop", path: "/shop", icon: ShoppingBag },
    { name: "Track", path: "/tracking", icon: Search },
    { name: "Account", path: "/dashboard", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gaming-black/80 backdrop-blur-lg border-t border-white/5 px-6 py-3">
      <div className="flex items-center justify-between">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 group"
          >
            <item.icon 
              size={20} 
              className={cn(
                "transition-all duration-300",
                location.pathname === item.path ? "text-neon-blue scale-110" : "text-white/50 group-hover:text-white"
              )} 
            />
            <span 
              className={cn(
                "text-[10px] uppercase font-bold tracking-widest transition-all duration-300",
                location.pathname === item.path ? "text-neon-blue opacity-100" : "text-white/30 opacity-60"
              )}
            >
              {item.name}
            </span>
            {location.pathname === item.path && (
              <div className="absolute -bottom-3 w-8 h-1 bg-neon-blue blur-[2px] rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
