import React from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, Globe, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-5xl font-black mb-6 tracking-tighter uppercase italic">Get in <span className="text-neon-blue">Touch</span></h1>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            Have a question or facing an issue with your top-up? 
            Our command center is always listening. Reach out through any of our transmission channels.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-blue group-hover:bg-neon-blue group-hover:text-black transition-all group-hover:box-glow">
                    <Mail size={24} />
                </div>
                <div>
                    <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-1">Email Support</h4>
                    <p className="text-lg font-bold">support@diamondrush.com</p>
                </div>
            </div>

            <a href="https://wa.me/03482640090" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <MessageCircle size={24} />
                </div>
                <div>
                    <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-1">WhatsApp Chat</h4>
                    <p className="text-lg font-bold">03482640090</p>
                </div>
            </a>

            <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all group-hover:box-glow">
                    <Globe size={24} />
                </div>
                <div>
                    <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-1">Main Office</h4>
                    <p className="text-lg font-bold">Bahria Town, Lahore, PK</p>
                </div>
            </div>
          </div>

          <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:text-neon-blue hover:border-neon-blue transition-all">
                      <Icon size={20} />
                  </button>
              ))}
          </div>
        </div>

        <div className="relative">
            <div className="glass-card p-10 rounded-[40px] border-white/5 relative z-10">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">Direct Transmission</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Gamer Name</label>
                            <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-neon-blue transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Email Address</label>
                            <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-neon-blue transition-all" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Subject</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-neon-blue transition-all appearance-none cursor-pointer">
                            <option>Payment Issue</option>
                            <option>Diamonds not received</option>
                            <option>Affiliate Inquiry</option>
                            <option>Other Feedback</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-2">Your Message</label>
                        <textarea rows={5} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-neon-blue transition-all resize-none"></textarea>
                    </div>
                    <button className="w-full py-5 bg-neon-blue text-black font-black rounded-2xl hover:scale-[1.02] transition-all box-glow flex items-center justify-center gap-3">
                        SEND MESSAGE
                        <Send size={18} />
                    </button>
                </form>
            </div>
            
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-neon-blue/10 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-neon-purple/10 blur-[100px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
