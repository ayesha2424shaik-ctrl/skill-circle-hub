import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Welcome = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-lg"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
        Welcome to <span className="text-primary">Skill Circle</span>
      </h1>
      <p className="text-muted-foreground mb-8">
        Explore Tech and Non-Tech Skills in One Place
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Login <ArrowRight size={16} />
        </Link>
        <Link
          to="/register"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
        >
          Register
        </Link>
      </div>
    </motion.div>
  </div>
);

export default Welcome;
