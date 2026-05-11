import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Success() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-[50px] border-green-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[80px]" />
        
        <div className="w-24 h-24 bg-green-500/10 border-4 border-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-10 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle size={48} />
        </div>

        <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Order <span className="text-green-500">Submitted</span></h1>
        <p className="text-white/60 text-lg mb-12">
            Your payment screenshot has been uploaded. Our team is verifying the transaction. Your diamonds will be delivered shortly!
        </p>

        <div className="grid grid-cols-1 gap-4 mb-12">
            <Link
              to="/tracking"
              className="px-8 py-5 bg-neon-blue text-black font-black rounded-2xl hover:scale-105 transition-all text-sm flex items-center justify-center gap-2 box-glow"
            >
              TRACK ORDER STATUS
              <ArrowRight size={18} />
            </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-white/30 uppercase tracking-widest font-black">
            <ShieldCheck size={14} className="text-green-500" />
            Manual Verification in progress
        </div>
      </motion.div>
    </div>
  );
}
