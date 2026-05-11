import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle } from "lucide-react";

const purchaseData = [
  { name: "Alex****", package: "520 Diamonds", time: "2 min ago" },
  { name: "Zero3****", package: "Weekly Membership", time: "Just now" },
  { name: "Ghost****", package: "1060 Diamonds", time: "5 min ago" },
  { name: "Raja****", package: "100 Diamonds", time: "1 min ago" },
  { name: "Shadow****", package: "310 Diamonds", time: "4 min ago" },
];

export default function LivePurchaseNotification() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setVisible(true);
      setCurrent(prev => (prev + 1) % purchaseData.length);
      
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }, 12000);

    return () => clearInterval(showInterval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-40"
        >
          <div className="glass-card p-4 rounded-xl flex items-center gap-4 border-neon-blue/20 max-w-[280px]">
            <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center text-neon-blue shrink-0">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs text-white/50 mb-0.5">{purchaseData[current].time}</p>
              <h5 className="text-sm font-bold text-white leading-tight">
                {purchaseData[current].name} purchased{" "}
                <span className="text-neon-blue">{purchaseData[current].package}</span>
              </h5>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
