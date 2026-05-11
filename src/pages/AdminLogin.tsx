import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ShieldAlert, LogIn } from "lucide-react";
import { useAuth } from "../App";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Admin access granted");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Invalid Admin Login. Try: admin@diamondrush.com / adminpassword");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full glass-card p-12 rounded-[50px] border-neon-blue/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-[80px] pointer-events-none" />
        
        <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-neon-blue/10 border-2 border-neon-blue/20 rounded-3xl flex items-center justify-center text-neon-blue box-glow">
                <ShieldAlert size={40} />
            </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2 tracking-tighter uppercase italic">Control <span className="text-neon-blue">Panel</span></h1>
          <p className="text-white/40 text-sm">Restricted Area. Authorized Access Only.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-2">Admin Identity</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-neon-blue transition-all"
                placeholder="admin@domain.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-2">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-neon-blue transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-5 bg-neon-blue text-black font-black rounded-2xl hover:scale-[1.02] disabled:opacity-50 transition-all box-glow flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full" />
            ) : (
              <>
                AUTHORIZE ACCESS
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
            <p className="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">
                By entering, you agree to the security protocol. <br />
                All actions are logged and audited.
            </p>
        </div>
      </div>
    </div>
  );
}
