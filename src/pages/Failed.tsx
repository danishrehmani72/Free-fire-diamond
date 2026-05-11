import React from "react";
import { Link } from "react-router-dom";
import { XCircle, RefreshCcw, Headphones, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Failed() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-[50px] border-red-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[80px]" />
        
        <div className="w-24 h-24 bg-red-500/10 border-4 border-red-500/20 rounded-full flex items-center justify-center text-red-500 mx-auto mb-10">
          <XCircle size={48} />
        </div>

        <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase italic">Payment <span className="text-red-500">Failed</span></h1>
        <p className="text-white/60 text-lg mb-12 px-4">
            Something went wrong with your transaction. Don't worry, if your money was deducted, it will be refunded automatically or your order will be processed manually.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <Link
              to="/checkout"
              className="px-8 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all text-sm flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              RETRY PAYMENT
            </Link>
            <a
              href="https://wa.me/03482640090"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-5 bg-neon-purple text-white font-black rounded-2xl hover:scale-105 transition-all text-sm flex items-center justify-center gap-2 box-glow"
            >
              <Headphones size={18} />
              GET HELP
            </a>
        </div>

        <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/40 uppercase hover:text-white transition-colors"
        >
            <ArrowLeft size={14} />
            Browse Other Packages
        </Link>
      </motion.div>
    </div>
  );
}
