import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Loader2, CheckCircle } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const msg = await register(name, email, password);
      setSuccess(msg);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Name", icon: User, type: "text", value: name, set: setName, placeholder: "John Doe" },
    { label: "Email", icon: Mail, type: "email", value: email, set: setEmail, placeholder: "you@example.com" },
    { label: "Password", icon: Lock, type: "password", value: password, set: setPassword, placeholder: "••••••••" },
    { label: "Confirm Password", icon: Lock, type: "password", value: confirmPassword, set: setConfirmPassword, placeholder: "••••••••" },
  ];

  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] glass-card-strong p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text mb-1">Create Account</h1>
          <p className="text-sm text-muted-foreground">Join Skill Circle today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</div>
          )}
          {success && (
            <div className="text-xs text-secondary bg-secondary/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <CheckCircle size={14} />
              {success}
            </div>
          )}

          {fields.map((f) => (
            <div key={f.label} className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <div className="relative">
                <f.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={f.type}
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Register
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
