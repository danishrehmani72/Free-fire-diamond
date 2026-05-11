import React, { useState } from "react";
import { Search, Package, CheckCircle, Clock, Zap, ArrowRight, ShieldCheck, XCircle } from "lucide-react";
import { Order } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setLoading(true);
    setSearched(true);
    
    // Simulate API search
    setTimeout(async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();
            const found = data.find((o: Order) => o.id === orderId.toUpperCase() || o.id === `ORD-${orderId.toUpperCase()}`);
            setOrder(found || null);
        } catch (err) {
            setOrder(null);
        } finally {
            setLoading(false);
        }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">Order <span className="text-neon-blue">Tracker</span></h1>
        <p className="text-white/40 text-lg">Enter your Order ID to see real-time delivery status.</p>
      </div>

      <div className="glass-card p-1 items-center bg-white/5 border-white/10 rounded-3xl mb-12">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={24} />
            <input
              type="text"
              placeholder="Ex: ORD-123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-transparent border-none pl-16 pr-6 py-6 text-xl font-mono focus:outline-none placeholder:text-white/10"
            />
          </div>
          <button
            type="submit"
            className="px-10 py-5 bg-neon-blue text-black font-black rounded-2xl hover:bg-neon-blue/90 transition-all box-glow"
          >
            TRACK STATUS
          </button>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-20"
          >
            <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent animate-spin rounded-full mb-6" />
            <p className="text-neon-blue font-bold tracking-widest animate-pulse">SCANNING DATABASE...</p>
          </motion.div>
        ) : searched && order ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 rounded-[40px] border-neon-blue/20 relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Current Status</span>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-black uppercase ${
                    order.status === 'completed' ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' :
                    order.status === 'pending' ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-xl font-mono font-bold text-white">{order.id}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Order Date</span>
                <p className="font-bold">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden md:block z-0" />
                
                {[
                    { label: "Payment Confirmed", icon: ShieldCheck, done: true },
                    { label: "Processing", icon: Clock, done: order.status === 'completed' || order.status === 'pending' },
                    { label: "Delivered", icon: CheckCircle, done: order.status === 'completed' }
                ].map((step, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                            step.done ? "bg-neon-blue border-neon-blue text-black box-glow" : "bg-gaming-card border-white/10 text-white/20"
                        }`}>
                            <step.icon size={28} />
                        </div>
                        <h4 className={`mt-4 text-xs font-bold uppercase tracking-widest ${step.done ? "text-white" : "text-white/20"}`}>
                            {step.label}
                        </h4>
                    </div>
                ))}
            </div>

            <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">Package</span>
                        <p className="font-bold text-sm text-neon-blue">{order.productName}</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">Game ID</span>
                        <p className="font-bold text-sm font-mono">{order.gameId}</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">Nickname</span>
                        <p className="font-bold text-sm">{order.nickname || "Gamer"}</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-2">Bill Amount</span>
                        <p className="font-bold text-sm">PKR {order.amount}</p>
                    </div>
                </div>
            </div>
          </motion.div>
        ) : searched && !order ? (
          <motion.div 
            key="not-found"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 glass-card rounded-[40px] border-red-500/20"
          >
            <XCircle className="mx-auto text-red-500 mb-6" size={64} />
            <h3 className="text-2xl font-bold mb-2">Order Not Found</h3>
            <p className="text-white/40 mb-8 px-4">The Order ID <strong>{orderId}</strong> could not be found in our central processing unit. <br /> Check for typos or contact support.</p>
            <button 
              onClick={() => setSearched(false)}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
            >
              SEARCH AGAIN
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
             <div className="p-8 glass-card rounded-3xl text-center">
                <Clock className="mx-auto text-neon-blue/40 mb-4" />
                <h4 className="font-bold text-sm mb-2">Live Status</h4>
                <p className="text-[10px] text-white/40">Real-time updates directly from our delivery servers.</p>
             </div>
             <div className="p-8 glass-card rounded-3xl text-center">
                <Zap className="mx-auto text-neon-blue/40 mb-4" />
                <h4 className="font-bold text-sm mb-2">History Log</h4>
                <p className="text-[10px] text-white/40">Secure archives of all your previous transactions.</p>
             </div>
             <div className="p-8 glass-card rounded-3xl text-center">
                <ShieldCheck className="mx-auto text-neon-blue/40 mb-4" />
                <h4 className="font-bold text-sm mb-2">Legitimacy</h4>
                <p className="text-[10px] text-white/40">Encrypted player data ensuring 100% account safety.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
