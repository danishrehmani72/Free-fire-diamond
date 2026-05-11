import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Search, 
  MoreVertical, 
  Trash2, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { Order, User, Product } from "../types";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setOrders(data.recentActivity);
      });
  }, []);

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        toast.success(`Order ${status} successfully`);
        // Refresh
        const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o) as Order[];
        setOrders(updatedOrders);
      }
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  if (!stats) return <div className="p-10">Loading Admin Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">Admin <span className="text-neon-blue">Dashboard</span></h1>
          <p className="text-white/40">Managing Diamond Rush Store</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {["overview", "orders", "products", "users"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all uppercase tracking-widest ${
                        activeTab === tab ? "bg-neon-blue text-black shadow-lg" : "text-white/40 hover:text-white"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Revenue", value: `PKR ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
              { label: "Total Orders", value: stats.orders, icon: ShoppingBag, color: "text-neon-blue", bg: "bg-neon-blue/10" },
              { label: "Active Users", value: stats.users, icon: Users, color: "text-neon-purple", bg: "bg-neon-purple/10" },
              { label: "Growth Rate", value: "+12.5%", icon: TrendingUp, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            ].map((stat, i) => (
              <div key={i} className="p-8 glass-card rounded-[32px] border-white/5 relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <ArrowUpRight className="text-white/10 group-hover:text-white/30 transition-all" size={20} />
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-card p-8 rounded-[40px] border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">RECENT ORDERS</h3>
                    <button className="text-xs text-neon-blue font-bold px-4 py-2 bg-neon-blue/10 rounded-lg">VIEW ALL</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="pb-4 text-xs font-bold text-white/30 uppercase tracking-widest pl-2">Order ID</th>
                                <th className="pb-4 text-xs font-bold text-white/30 uppercase tracking-widest">Player</th>
                                <th className="pb-4 text-xs font-bold text-white/30 uppercase tracking-widest">Package</th>
                                <th className="pb-4 text-xs font-bold text-white/30 uppercase tracking-widest">Amount</th>
                                <th className="pb-4 text-xs font-bold text-white/30 uppercase tracking-widest">Status</th>
                                <th className="pb-4 text-xs font-bold text-white/30 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 pl-2">
                                        <p className="text-sm font-mono text-white/70">{order.id}</p>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{order.nickname || "Gamer"}</span>
                                            <span className="text-[10px] text-white/30 font-mono italic">{order.gameId}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="text-sm">{order.productName}</span>
                                    </td>
                                    <td className="py-4">
                                        <span className="text-sm font-bold">PKR {order.amount}</span>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                            order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                            order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {order.status === 'pending' && (
                                                <button 
                                                    onClick={() => updateOrderStatus(order.id, 'completed')}
                                                    className="p-1.5 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors"
                                                    title="Complete Order"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            <button className="p-1.5 hover:bg-white/10 text-white/40 rounded-lg transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
                <div className="glass-card p-8 rounded-[40px] border-white/5">
                    <h3 className="text-xl font-bold mb-6">REVENUE CHART</h3>
                    <div className="aspect-[4/3] flex items-end justify-between gap-2 px-2">
                        {stats.revenueData.map((d: any, i: number) => (
                            <div key={i} className="flex-grow flex flex-col items-center gap-2">
                                <div 
                                    className="w-full bg-neon-blue/20 hover:bg-neon-blue transition-all rounded-t-lg relative group" 
                                    style={{ height: `${(d.total / 1000) * 100}%`, minHeight: '20px' }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gaming-card border border-white/10 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        PKR {d.total}
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-white/30 uppercase">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 rounded-[40px] border-neon-blue/20 bg-neon-blue/[0.02] flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center text-neon-blue mb-6 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                        <ShoppingBag size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">QUICK ACTION</h4>
                    <p className="text-xs text-white/40 mb-6 px-4">Instantly process all pending manual clearance orders.</p>
                    <button className="w-full py-4 bg-neon-blue text-black font-black rounded-xl box-glow">PROCESS ALL PENDING</button>
                </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
