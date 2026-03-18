import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code, Users, BookOpen, Sparkles, TrendingUp, Award } from "lucide-react";
import logo from "@/assets/logo.svg";

const floatingIcons = [
  { icon: Code, x: "10%", y: "20%", delay: 0 },
  { icon: Users, x: "85%", y: "15%", delay: 0.5 },
  { icon: BookOpen, x: "75%", y: "75%", delay: 1 },
  { icon: TrendingUp, x: "15%", y: "70%", delay: 1.5 },
  { icon: Award, x: "50%", y: "85%", delay: 0.8 },
  { icon: Sparkles, x: "90%", y: "45%", delay: 0.3 },
];

const stats = [
  { label: "Skills", value: "18+" },
  { label: "Videos", value: "30+" },
  { label: "Resources", value: "25+" },
  { label: "Platforms", value: "20+" },
];

const Welcome = () => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    {/* Background gradient orbs */}
    <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
    
    {/* Floating icons */}
    {floatingIcons.map((item, i) => (
      <motion.div
        key={i}
        className="absolute hidden md:flex w-12 h-12 rounded-xl glass-card items-center justify-center text-primary/40"
        style={{ left: item.x, top: item.y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: item.delay, duration: 0.5 },
          scale: { delay: item.delay, duration: 0.5 },
          y: { delay: item.delay, duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <item.icon size={22} />
      </motion.div>
    ))}

    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 elegant-shadow"
        >
          <Pen size={28} className="text-primary-foreground" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Master Any Skill with{" "}
          <span className="gradient-text">Skill Circle</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Explore curated tech and non-tech skills with videos, resources, and hands-on coding platforms.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity elegant-shadow"
          >
            Get Started Free <ArrowRight size={16} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-4 gap-4 max-w-md mx-auto"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold gradient-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default Welcome;
