import React from "react";
import { Zap, ShieldCheck, TrendingUp, Users, Target, Rocket } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center max-w-3xl mx-auto mb-24">
        <h1 className="text-6xl font-black mb-6 tracking-tighter uppercase italic">The Diamond <span className="text-neon-blue">Mission</span></h1>
        <p className="text-white/60 text-lg leading-relaxed">
            Founded in 2023, Diamond Rush was born out of a simple frustration: 
            topping up Free Fire diamonds shouldn't be a gamble. We built a platform 
            where speed, safety, and price meet in perfect harmony.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        <div className="glass-card p-12 rounded-[40px] border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target size={200} />
            </div>
            <h2 className="text-3xl font-black mb-6 uppercase italic text-neon-blue">Our Mission</h2>
            <p className="text-white/60 text-lg leading-relaxed">
                To empower gamers across the region with a transparent, ultra-fast, 
                and affordable top-up experience that respects their time and hard-earned currency.
            </p>
        </div>
        <div className="glass-card p-12 rounded-[40px] border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Rocket size={200} />
            </div>
            <h2 className="text-3xl font-black mb-6 uppercase italic text-neon-purple">Our Vision</h2>
            <p className="text-white/60 text-lg leading-relaxed">
               Becoming the primary global hub for digital gaming assets, sets new standards 
               for instant fulfillment and absolute security in the e-commerce gaming sector.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
              { label: "Active Users", val: "500K+", icon: Users },
              { label: "Daily Orders", val: "10K+", icon: Zap },
              { label: "Partner Sites", val: "150+", icon: Target },
              { label: "Market Growth", val: "300%", icon: TrendingUp },
          ].map((stat, i) => (
              <div key={i} className="text-center">
                  <stat.icon className="mx-auto text-white/10 mb-6" size={40} />
                  <h3 className="text-5xl font-black mb-2">{stat.val}</h3>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
              </div>
          ))}
      </div>

      <div className="relative rounded-[50px] overflow-hidden p-12 md:p-24 border border-white/5 bg-white/[0.02]">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                   <h2 className="text-4xl font-black mb-8 leading-tight">BUILT BY GAMERS,<br /><span className="text-neon-blue italic">FOR GAMERS.</span></h2>
                   <p className="text-white/60 text-lg leading-relaxed mb-8">
                       Our team consists of developers who actually play Free Fire. 
                       We understand the rush of getting that new Legendary skin or Elite Pass. 
                       That's why we never compromise on delivery speeds.
                   </p>
                   <div className="flex items-center gap-4">
                       <ShieldCheck className="text-neon-blue" />
                       <span className="font-bold text-sm tracking-widest uppercase">Certified Gaming Partner</span>
                   </div>
               </div>
               <div className="relative aspect-video rounded-3xl overflow-hidden grayscale contrast-125 brightness-75">
                   <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" alt="Team" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay" />
               </div>
           </div>
      </div>
    </div>
  );
}
