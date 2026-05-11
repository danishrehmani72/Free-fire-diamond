import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, CreditCard, Wallet, Bitcoin, ChevronLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("easypaisa");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pending_order");
    if (!saved) {
      navigate("/shop");
      return;
    }
    setOrderInfo(JSON.parse(saved));
  }, [navigate]);

  const paymentMethods = [
    { id: "easypaisa", name: "EasyPaisa", icon: Wallet, color: "text-[#00AE42]" },
  ];

  const handlePay = async () => {
    if (!screenshot) {
      toast.error("Please upload a payment screenshot");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(async () => {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "user-1", // Mock userId
            gameId: orderInfo.uid,
            nickname: orderInfo.nickname,
            productId: orderInfo.product.id,
            amount: orderInfo.product.price,
            screenshot: "uploaded_screenshot_url" // Mocking file upload
          })
        });

        if (res.ok) {
          toast.success("Order placed successfully!");
          localStorage.removeItem("pending_order");
          navigate("/success");
        } else {
          toast.error("Payment failed. Please try again.");
          navigate("/failed");
        }
      } catch (err) {
        toast.error("An error occurred");
        navigate("/failed");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  if (!orderInfo) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        BACK TO DETAILS
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left: Payment Options */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <h1 className="text-3xl font-black mb-2">SECURE CHECKOUT</h1>
            <p className="text-white/60">Choose your preferred payment method</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left bg-neon-blue/10 border-neon-blue shadow-[0_0_20px_rgba(0,242,255,0.1)]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${method.color}`}>
                    <method.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">{method.name}</h4>
                    <p className="text-sm font-mono text-neon-blue mt-1">Number: 03316215263</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-neon-blue flex items-center justify-center text-black">
                  <Check size={14} strokeWidth={4} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 uppercase italic">1. Transfer Payment</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                Please send exactly <span className="text-neon-blue font-bold">PKR {orderInfo.product.price}</span> to the EasyPaisa number below:
              </p>
              <div className="p-4 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">EasyPaisa Account</p>
                  <p className="text-xl font-black text-white">03316215263</p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText("03316215263");
                    toast.success("Number copied!");
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all"
                >
                  COPY
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <h3 className="text-xl font-bold mb-4 uppercase italic">2. Upload Screenshot</h3>
              <label className="block w-full cursor-pointer">
                <div className={`w-full p-8 border-2 border-dashed rounded-2xl text-center transition-all ${screenshot ? 'border-neon-blue bg-neon-blue/5' : 'border-white/10 hover:border-white/20 bg-white/[0.02]'}`}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  />
                  {screenshot ? (
                    <div className="flex items-center justify-center gap-3 text-neon-blue font-bold">
                      <Check size={20} />
                      {screenshot.name} (Changed)
                    </div>
                  ) : (
                    <p className="text-sm text-white/40">Select or drop your transaction screenshot here</p>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
             <ShieldCheck className="text-neon-blue shrink-0" size={32} />
             <p className="text-xs text-white/50 leading-relaxed">
               Your payment information is encrypted and never stored on our servers. 
               Transactions are processed securely via official payment gateways.
             </p>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-2">
            <div className="glass-card p-8 rounded-3xl sticky top-24">
                <h3 className="text-xl font-bold mb-6">ORDER SUMMARY</h3>
                
                <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                        <img src={orderInfo.product.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                        <div>
                            <h4 className="font-bold text-sm">{orderInfo.product.name}</h4>
                            <p className="text-[10px] text-white/40 font-mono">UID: {orderInfo.uid}</p>
                        </div>
                    </div>

                    <div className="space-y-3 pb-6 border-b border-white/5">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/50">Subtotal</span>
                            <span>PKR {orderInfo.product.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-white/50">Service Fee</span>
                            <span className="text-neon-blue">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-white/50">Discount</span>
                            <span className="text-neon-purple">-PKR 0</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-bold">Total Amount</span>
                        <span className="text-2xl font-black text-neon-blue">PKR {orderInfo.product.price}</span>
                    </div>
                </div>

                <button 
                  disabled={loading}
                  onClick={handlePay}
                  className="w-full py-5 bg-neon-blue text-black font-black rounded-2xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all box-glow flex items-center justify-center gap-3 mb-6"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent animate-spin rounded-full" />
                  ) : (
                    <>
                      SUBMIT ORDER
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="flex flex-wrap justify-center gap-3 opacity-30 grayscale saturate-0">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-4" alt="" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-4" alt="" />
                    <img src="https://img.icons8.com/color/48/000000/bitcoin.png" className="h-4" alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
