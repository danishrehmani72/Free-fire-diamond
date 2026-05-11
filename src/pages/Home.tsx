import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock, Users, Star, ArrowRight, Play, ShoppingCart } from "lucide-react";
import DiamondCard from "../components/DiamondCard";
import TrustBadges from "../components/TrustBadges";
import FAQAccordion from "../components/FAQAccordion";
import { useEffect, useState } from "react";
import { Product } from "../types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 4)));
  }, []);

  const stats = [
    { label: "Happy Gamers", value: "500k+", icon: Users },
    { label: "Orders Processed", value: "1.2M+", icon: ShoppingCart },
    { label: "Avg. Delivery Time", value: "30s", icon: Clock },
    { label: "Trust Score", value: "4.9/5", icon: Star },
  ];

  const features = [
    { title: "Instant Delivery", desc: "Our system is 100% automated. Diamonds arrive in seconds.", icon: Zap },
    { title: "Best Market Price", desc: "We offer the most competitive rates in Pakistan.", icon: Star },
    { title: "24/7 Support", desc: "Our support team is always active on WhatsApp.", icon: Users },
    { title: "Account Safety", desc: "Official top-up center API. No ban risk guaranteed.", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-black uppercase tracking-widest mb-6">
                <Zap size={14} className="fill-neon-blue" />
                Trusted by 500k+ FF Gamers
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tighter">
                TOP UP FREE FIRE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple text-glow">
                  DIAMONDS INSTANTLY
                </span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
                Experience the fastest and most secure way to buy Free Fire diamonds. 
                Legit top-up, amazing bonuses, and 24/7 instant delivery.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="px-10 py-5 bg-neon-blue text-black font-black rounded-xl hover:scale-105 transition-all text-center box-glow flex items-center justify-center gap-2 group"
                >
                  BUY DIAMONDS NOW
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/tracking"
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Play size={18} className="fill-white" />
                  TRACK ORDER
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-gaming-black" alt="user" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-neon-blue font-bold">
                    <Star size={14} className="fill-neon-blue" />
                    4.9/5 Rating
                  </div>
                  <p className="text-white/40">From verified customers</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 w-full aspect-square rounded-[40px] overflow-hidden border border-white/10 group">
                 <img 
                  src="https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?auto=format&fit=crop&q=80&w=800"
                  alt="Gaming Hero"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-black via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-3xl border-neon-blue/20">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white/50">LATEST TOP-UP</span>
                        <span className="text-[10px] text-neon-blue bg-neon-blue/10 px-2 py-0.5 rounded uppercase font-black">Success</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center">
                            <Zap className="text-neon-blue" />
                        </div>
                        <div>
                            <h4 className="font-bold">14,260 Diamonds</h4>
                            <p className="text-xs text-white/40">Sent to ID: 123456789</p>
                        </div>
                    </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-blue/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-purple/20 blur-[80px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                    <stat.icon className="text-white/20 mb-4" size={32} />
                    <h3 className="text-4xl font-black text-white mb-1">{stat.value}</h3>
                    <p className="text-xs font-bold tracking-widest text-white/40 uppercase">{stat.label}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Popular Packages */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black mb-4">POPULAR PACKAGES</h2>
            <p className="text-white/60">Choose the best diamond packs carefully selected for you.</p>
          </div>
          <Link to="/shop" className="text-neon-blue font-bold flex items-center gap-2 hover:underline">
            VIEW ALL PACKAGES
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <DiamondCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gaming-card/40 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-black mb-6">WHY CHOOSE US?</h2>
                <p className="text-white/60">We provide the most reliable top-up service in the region with unique features you won't find anywhere else.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((f, i) => (
                    <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-neon-blue/30 transition-all hover:bg-neon-blue/[0.02]">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/60 group-hover:text-neon-blue group-hover:scale-110 transition-all mb-6">
                            <f.icon size={28} />
                        </div>
                        <h4 className="text-lg font-bold mb-3">{f.title}</h4>
                        <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ & Trust */}
      <section className="max-w-7xl mx-auto px-4 w-full pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
                <h2 className="text-4xl font-black mb-8 leading-tight">FREQUENTLY ASKED QUESTIONS</h2>
                <p className="text-white/60 mb-12">Everything you need to know about our service and diamonds delivery.</p>
                <FAQAccordion />
            </div>
            <div className="flex flex-col justify-center">
                <div className="glass-card p-12 rounded-[40px] border-neon-purple/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 blur-3xl" />
                    <h2 className="text-3xl font-black mb-6">NEED CUSTOM HELP?</h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        Our support team is available 24/7 to help you with any issues regarding your orders or payment questions.
                    </p>
                    <a 
                      href="https://wa.me/03482640090" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-neon-purple text-white font-bold rounded-xl hover:scale-105 transition-all box-glow"
                    >
                        CONTACT SUPPORT
                        <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </div>

        <TrustBadges />
      </section>
    </div>
  );
}
