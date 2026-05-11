import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to receive my diamonds?",
    a: "Our delivery system is automated. Most orders are processed instantly within 3-60 seconds. In rare cases of server load, it might take up to 30 minutes."
  },
  {
    q: "Is it safe to top up from Diamond Rush?",
    a: "Yes, we use official Free Fire API integrations. Your account will not be banned. We've processed over 500k+ orders without a single security issue."
  },
  {
    q: "What payment methods do you support?",
    a: "We support Visa/Mastercard, JazzCash, EasyPaisa, Binance Pay, and various Cryptocurrencies. All payments are encrypted and secure."
  },
  {
    q: "I entered the wrong Player ID, what should I do?",
    a: "Contact our support immediately via WhatsApp or Email before the order is processed. Once processed, we cannot refund or transfer diamonds."
  }
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div 
          key={i} 
          className={`glass-card rounded-xl overflow-hidden transition-all ${open === i ? 'border-neon-blue/30' : 'border-white/5'}`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <span className="font-bold text-sm md:text-base">{faq.q}</span>
            <ChevronDown 
              className={`transition-transform duration-300 ${open === i ? 'rotate-180 text-neon-blue' : 'text-white/30'}`} 
              size={20} 
            />
          </button>
          
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
