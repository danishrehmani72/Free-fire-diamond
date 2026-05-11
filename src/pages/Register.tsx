import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus, ArrowRight } from "lucide-react";
import { useAuth } from "../App";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, name, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
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
        <div className="absolute top-0 left-0 w-32 h-32 bg-neon-purple/10 blur-3xl pointer-events-none" />

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">Create <span className="text-neon-purple">Account</span></h1>
          <p className="text-white/40 text-sm">Join the largest FF diamond store.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-neon-purple transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest pl-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-neon-purple transition-all"
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
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-neon-purple transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <p className="text-[10px] text-white/30 text-center px-4">
              By registering, you agree to our <Link to="/terms" className="text-white/50 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-white/50 hover:underline">Privacy Policy</Link>.
          </p>

          <button
            disabled={loading}
            className="w-full py-4 bg-neon-purple text-white font-black rounded-2xl hover:scale-[1.02] disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(188,19,254,0.3)] flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
            ) : (
              <>
                CREATE ACCOUNT
                <UserPlus size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-white/40 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-neon-purple font-bold hover:underline">Sign In</Link>
            </p>
        </div>
      </motion.div>
    </div>
  );
}
