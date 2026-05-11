import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/03482640090"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-shadow hover:shadow-[0_0_40px_rgba(37,211,102,0.6)]"
      title="Chat with us on WhatsApp"
    >
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white animate-bounce">
        1
      </div>
      <MessageCircle size={32} />
    </motion.a>
  );
}
