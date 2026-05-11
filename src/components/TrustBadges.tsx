import React from "react";
import { CheckCircle, Truck, ShieldCheck, Headphones } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    { icon: CheckCircle, title: "Instant Delivery", desc: "Diamonds in your account in 3s-60s" },
    { icon: ShieldCheck, title: "100% Secure", desc: "Legit top-up via official FF API" },
    { icon: Truck, title: "Safe & Legal", desc: "No ban risk for your Free Fire account" },
    { icon: Headphones, title: "24/7 Support", desc: "Real-time human support live 24/7" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 pb-24 border-t border-white/5">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center text-neon-blue mb-4">
            <badge.icon size={24} />
          </div>
          <h4 className="text-sm font-bold text-white mb-2">{badge.title}</h4>
          <p className="text-xs text-white/50 leading-relaxed">{badge.desc}</p>
        </div>
      ))}
    </div>
  );
}
