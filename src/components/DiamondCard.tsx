import React from "react";
import { Link } from "react-router-dom";
import { Zap, TrendingUp, BadgePercent } from "lucide-react";
import { Product } from "../types";
import { motion } from "framer-motion";

interface DiamondCardProps {
  product: Product;
  key?: React.Key;
}

export default function DiamondCard({ product }: DiamondCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative h-full glass-card rounded-2xl overflow-hidden transition-all hover:border-neon-blue/40"
    >
      {product.popular && (
        <div className="absolute top-4 left-4 z-10 bg-neon-blue text-black text-[10px] font-black uppercase px-2 py-1 rounded-sm flex items-center gap-1 shadow-[0_0_10px_rgba(0,242,255,0.5)]">
          <TrendingUp size={12} />
          POPULAR
        </div>
      )}

      {product.discount > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-neon-purple text-white text-[10px] font-black uppercase px-2 py-1 rounded-sm flex items-center gap-1">
          <BadgePercent size={12} />
          -{product.discount}%
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-black via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon-blue transition-colors">
          {product.name}
        </h3>
        
        {product.bonus > 0 && (
          <p className="text-xs text-neon-blue font-bold mb-4 flex items-center gap-1">
            <Zap size={12} className="fill-neon-blue" />
            +{product.bonus} Bonus Diamonds
          </p>
        )}

        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-xs text-white/40 line-through">
              PKR {(product.price / (1 - (product.discount / 100))).toFixed(0)}
            </p>
            <p className="text-2xl font-black text-white">
              PKR {product.price}
            </p>
          </div>
          
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 bg-white/5 group-hover:bg-neon-blue group-hover:text-black rounded-lg text-xs font-bold transition-all border border-white/10 group-hover:border-neon-blue"
          >
            ORDER NOW
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
