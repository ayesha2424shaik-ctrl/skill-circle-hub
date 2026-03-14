import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[150px] animate-glow-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-muted-foreground mb-8"
        >
          <Sparkles size={14} className="text-primary" />
          Learn. Grow. Excel.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
        >
          Welcome to{" "}
          <span className="gradient-text">Skill Circle</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto"
        >
          Explore Tech and Non-Tech Skills in One Place
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
          >
            Login
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl glass-card text-foreground font-semibold text-sm transition-all hover:bg-white/10 hover:scale-105"
          >
            Register
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
