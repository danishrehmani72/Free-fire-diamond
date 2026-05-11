import React, { useState, useEffect } from "react";
import { useAuth } from "../App";
import { ShoppingBag, CreditCard, User, Settings, Shield, ArrowRight, Zap, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Order } from "../types";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.user) {
      fetch(`/api/orders?userId=${auth.user.id}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        });
    }
  }, [auth.user]);

  if (!auth.user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
            <div className="p-8 glass-card rounded-[32px] mb-8 text-center border-neon-blue/20">
                <div className="w-20 h-20 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-neon-blue/20">
                    <User size={40} className="text-neon-blue" />
                </div>
                <h2 className="text-xl font-bold mb-1">{auth.user.name}</h2>
                <p className="text-xs text-white/40 mb-4">{auth.user.email}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60">
                    <Shield size={12} className="text-neon-blue" />
                    VERIFIED GAMER
                </div>
            </div>

            <nav className="space-y-2">
                {[
                    { name: "Order History", icon: ShoppingBag, active: true },
                    { name: "My Wallet", icon: CreditCard },
                    { name: "Account Settings", icon: Settings },
                ].map((item, i) => (
                    <button 
                        key={i}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                            item.active ? "bg-neon-blue text-black font-bold" : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                    >
                        <item.icon size={20} />
                        {item.name}
                    </button>
                ))}
                <button 
                    onClick={logout}
                    className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all font-bold"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-8 glass-card rounded-[32px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl group-hover:bg-neon-blue/20 transition-all" />
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Wallet Balance</h4>
                    <div className="flex items-center justify-between">
                        <h3 className="text-4xl font-black">PKR {auth.user.balance.toLocaleString()}</h3>
                        <button className="px-4 py-2 bg-neon-blue text-black text-xs font-bold rounded-lg box-glow">TOP UP</button>
                    </div>
                </div>
                <div className="p-8 glass-card rounded-[32px] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 blur-3xl group-hover:bg-neon-purple/20 transition-all" />
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Loyalty Points</h4>
                    <div className="flex items-center justify-between">
                        <h3 className="text-4xl font-black">12,450</h3>
                        <button className="px-4 py-2 bg-neon-purple text-white text-xs font-bold rounded-lg box-glow">REDEEM</button>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">Purchase <span className="text-neon-blue">History</span></h3>
                    <button className="text-sm font-bold text-white/40 hover:text-white transition-colors">Export CSV</button>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        [1,2,3].map(i => <div key={i} className="h-24 glass-card rounded-2xl animate-pulse" />)
                    ) : orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} className="p-6 glass-card rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-neon-blue">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{order.productName}</h4>
                                        <p className="text-xs text-white/40">Sent to Player ID: {order.gameId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end gap-12">
                                    <div className="text-right">
                                        <p className="text-sm font-bold">PKR {order.amount}</p>
                                        <p className="text-[10px] text-white/30">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                            order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                            order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                            {order.status}
                                        </span>
                                        <button className="text-[10px] text-neon-blue font-bold flex items-center gap-1 hover:underline">
                                           INVOICE <ArrowRight size={10} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                            <ShoppingBag className="mx-auto text-white/10 mb-4" size={48} />
                            <p className="text-white/40 mb-6">You haven't made any purchases yet.</p>
                            <Link to="/shop" className="px-8 py-3 bg-neon-blue text-black font-bold rounded-xl box-glow">START SHOPPING</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
