import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import LivePurchaseNotification from "./components/LivePurchaseNotification";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import OrderTracking from "./pages/OrderTracking";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import WhatsAppButton from "./components/WhatsAppButton";

import { User, AuthState } from "./types";

interface AuthContextType {
  auth: AuthState;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, name: string, pass: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { user: null, token: null };
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const login = async (email: string, pass: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });
    if (res.ok) {
      const data = await res.json();
      setAuth(data);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const register = async (email: string, name: string, pass: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password: pass }),
    });
    if (res.ok) {
      const data = await res.json();
      setAuth(data);
    } else {
      throw new Error("Registration failed");
    }
  };

  const logout = () => setAuth({ user: null, token: null });

  const isAdmin = auth.user?.role === "admin";

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, isAdmin }}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen relative overflow-hidden flex flex-col">
          <div className="atmosphere" />
          <Navbar />
          
          <main className="flex-grow pt-20 pb-24 md:pb-0">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
                <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
                <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
                <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
                <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path="/tracking" element={<PageTransition><OrderTracking /></PageTransition>} />
                <Route path="/success" element={<PageTransition><Success /></PageTransition>} />
                <Route path="/failed" element={<PageTransition><Failed /></PageTransition>} />
                <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
                <Route path="/admin/*" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
          <MobileBottomNav />
          <LivePurchaseNotification />
          <WhatsAppButton />
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
