import React, { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import DiamondCard from "../components/DiamondCard";
import { Product } from "../types";
import { motion } from "framer-motion";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter">DIAMOND PACKAGES</h1>
          <p className="text-white/60">Select your preferred top-up amount</p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              type="text" 
              placeholder="Search diamonds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-neon-blue transition-all w-full md:w-64"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-neon-blue transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-[400px] glass-card rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map((product) => (
              <DiamondCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 glass-card rounded-3xl border-white/5">
              <Search className="mx-auto text-white/10 mb-6" size={64} />
              <h3 className="text-xl font-bold mb-2">No packages found</h3>
              <p className="text-white/40">Try a different search term or browse all packages.</p>
              <button 
                onClick={() => setSearch("")}
                className="mt-6 px-8 py-3 bg-neon-blue text-black font-bold rounded-xl"
              >
                CLEAR SEARCH
              </button>
            </div>
          )}
        </>
      )}

      {/* Special Deals Banner */}
      <div className="relative rounded-[40px] overflow-hidden p-12 md:p-20 border border-neon-blue/20 bg-gradient-to-br from-neon-blue/10 to-transparent mb-24">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-black mb-6 leading-tight">WANT EVEN MORE <br /><span className="text-neon-blue italic">VALUE?</span></h2>
          <p className="text-white/60 text-lg mb-8">
            Check our weekly and monthly monthly memberships for the absolute best price per diamond.
            Members get exclusive login rewards and special bonuses.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-neon-blue text-black font-black rounded-xl box-glow">MEMBERSHIPS</button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold">LEARN MORE</button>
          </div>
        </div>
        <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:block opacity-20">
          <LayoutGrid size={300} className="text-neon-blue" />
        </div>
      </div>
    </div>
  );
}
