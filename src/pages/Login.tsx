import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] glass-card-strong p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text mb-1">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to Skill Circle</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Login
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
