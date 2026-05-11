import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useAuth } from "../App";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
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
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid credentials. Try guest login: user@example.com / password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 rounded-[40px] border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-purple/10 blur-3xl pointer-events-none" />

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">Welcome <span className="text-neon-blue">Back</span></h1>
          <p className="text-white/40 text-sm">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-neon-blue transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-2">Password</label>
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

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-neon-blue focus:ring-neon-blue" />
              <span className="text-xs text-white/50 group-hover:text-white transition-colors">Remember me</span>
            </label>
            <Link to="#" className="text-xs text-neon-blue hover:underline">Forgot Password?</Link>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-neon-blue text-black font-black rounded-2xl hover:scale-[1.02] disabled:opacity-50 transition-all box-glow flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full" />
            ) : (
              <>
                SIGN IN
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-white/40 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-neon-blue font-bold hover:underline">Register Now</Link>
            </p>
        </div>
      </motion.div>
    </div>
  );
}
