import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Zap, ShieldCheck, Info, Check, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [uid, setUid] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: Product) => p.id === id);
        setProduct(found || null);
        setLoading(false);
      });
  }, [id]);

  const handleBuy = () => {
    if (!uid || uid.length < 5) {
      toast.error("Please enter a valid Player UID");
      return;
    }
    // Save to local storage for checkout
    localStorage.setItem("pending_order", JSON.stringify({
        product,
        uid,
        nickname
    }));
    navigate("/checkout");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        BACK TO SHOP
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Product Image & Info */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="glass-card rounded-[40px] overflow-hidden border-white/5 p-4 mb-8">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-[4/3] object-cover rounded-[32px]" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 glass-card rounded-3xl">
                <ShieldCheck className="text-neon-blue mb-3" size={24} />
                <h4 className="font-bold text-sm mb-1">Authenticated</h4>
                <p className="text-xs text-white/40">Official Garena API Delivery</p>
            </div>
            <div className="p-6 glass-card rounded-3xl">
                <Zap className="text-neon-blue mb-3" size={24} />
                <h4 className="font-bold text-sm mb-1">Turbo Speed</h4>
                <p className="text-xs text-white/40">Instant Delivery Guaranteed</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Selection & Checkout */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl font-black mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-black text-neon-blue">PKR {product.price}</span>
            {product.discount > 0 && (
              <span className="text-lg text-white/30 line-through">PKR {(product.price * (1 + product.discount/100)).toFixed(0)}</span>
            )}
            <span className="bg-neon-purple/20 text-neon-purple text-[10px] font-black px-2 py-0.5 rounded uppercase">-{product.discount}% OFF</span>
          </div>

          <p className="text-white/60 mb-10 leading-relaxed">
            Premium Free Fire diamond top-up. Get your diamonds instantly in your account. 
            All you need is your Player Player ID (UID). Safe, secure, and permanent store.
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <label className="block text-sm font-bold text-white/70 mb-3 uppercase tracking-widest">1. Enter Player UID <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Example: 123456789"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg font-mono focus:outline-none focus:border-neon-blue transition-colors"
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-full transition-colors"
                  title="Where is my UID?"
                >
                  <Info size={18} className="text-white/30" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white/70 mb-3 uppercase tracking-widest">2. Player Nickname (Optional)</label>
              <input 
                type="text" 
                placeholder="Example: ProGamer_99"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-neon-blue transition-colors"
              />
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border-neon-blue/20 mb-8 bg-neon-blue/[0.02]">
            <div className="flex items-center justify-between mb-4">
               <span className="text-white/60">Selected Package</span>
               <span className="font-bold">{product.name}</span>
            </div>
            <div className="flex items-center justify-between mb-6">
               <span className="text-white/60">Total Amount</span>
               <span className="text-2xl font-black text-neon-blue">PKR {product.price}</span>
            </div>
            
            <button 
              onClick={handleBuy}
              className="w-full py-5 bg-neon-blue text-black font-black rounded-2xl hover:scale-[1.02] transition-all box-glow flex items-center justify-center gap-3"
            >
              PROCEED TO PAYMENT
              <ArrowRight size={22} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 py-4 border-t border-white/5">
             <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase">
                <Check size={14} className="text-neon-blue" />
                No Extra Fees
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase">
                <Check size={14} className="text-neon-blue" />
                Encrypted Info
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase">
                <Check size={14} className="text-neon-blue" />
                Official Partner
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
