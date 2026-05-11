import React from "react";
import FAQAccordion from "../components/FAQAccordion";
import { HelpCircle, MessageSquare, Zap, ShieldCheck } from "lucide-react";

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase italic">Diamond <span className="text-neon-blue">Guide</span></h1>
        <p className="text-white/40 text-lg">Everything you need to know about Free Fire top-ups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 glass-card rounded-3xl text-center border-white/5">
              <Zap className="text-neon-blue mx-auto mb-4" />
              <h4 className="font-bold text-sm mb-2">Instant Delivery</h4>
              <p className="text-[10px] text-white/40">Most orders are delivered in under 60 seconds via auto-sync.</p>
          </div>
          <div className="p-8 glass-card rounded-3xl text-center border-white/5">
              <ShieldCheck className="text-neon-blue mx-auto mb-4" />
              <h4 className="font-bold text-sm mb-2">Account Safety</h4>
              <p className="text-[10px] text-white/40">We use official Garena APIs. 100% legal & ban-free.</p>
          </div>
          <div className="p-8 glass-card rounded-3xl text-center border-white/5">
              <MessageSquare className="text-neon-blue mx-auto mb-4" />
              <h4 className="font-bold text-sm mb-2">Live Support</h4>
              <p className="text-[10px] text-white/40">Our team is active on WhatsApp 24/7 to assist you.</p>
          </div>
      </div>

      <div className="glass-card p-10 rounded-[40px] border-white/5">
         <FAQAccordion />
      </div>

      <div className="mt-20 p-12 glass-card rounded-[40px] border-neon-purple/20 bg-neon-purple/[0.02] text-center">
          <HelpCircle className="text-neon-purple mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-black mb-4 uppercase italic">Still have <span className="text-neon-purple">Questions?</span></h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
             Our expert support specialist is available to chat with you right now on WhatsApp to resolve any doubts.
          </p>
          <a
            href="https://wa.me/03482640090"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-neon-purple text-white font-black rounded-2xl hover:scale-105 transition-all box-glow"
          >
             CHAT WITH US
             <MessageSquare size={20} />
          </a>
      </div>
    </div>
  );
}
