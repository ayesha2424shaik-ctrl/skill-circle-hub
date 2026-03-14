import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Loader2, CheckCircle } from "lucide-react";

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
    setError(""); setSuccess("");
    if (!name || !email || !password || !confirmPassword) { setError("All fields are required"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
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
    { label: "Name", type: "text", value: name, set: setName, placeholder: "John Doe" },
    { label: "Email", type: "email", value: email, set: setEmail, placeholder: "you@example.com" },
    { label: "Password", type: "password", value: password, set: setPassword, placeholder: "••••••••" },
    { label: "Confirm Password", type: "password", value: confirmPassword, set: setConfirmPassword, placeholder: "••••••••" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-card border border-border rounded-lg p-6"
      >
        <h1 className="text-xl font-bold text-foreground mb-1">Create Account</h1>
        <p className="text-sm text-muted-foreground mb-6">Join Skill Circle today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && (
            <p className="text-sm text-secondary flex items-center gap-1">
              <CheckCircle size={14} /> {success}
            </p>
          )}
          {fields.map(f => (
            <div key={f.label}>
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <input
                type={f.type} value={f.value} onChange={e => f.set(e.target.value)}
                placeholder={f.placeholder}
                className="mt-1 w-full px-3 py-2 rounded-md bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
          <button
            type="submit" disabled={loading}
            className="w-full py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />} Register
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
