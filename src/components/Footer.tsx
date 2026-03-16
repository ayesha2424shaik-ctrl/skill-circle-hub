import { Pen, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-lg font-bold text-primary mb-3">
            <Pen size={20} />
            Skill Circle
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your one-stop platform to explore, learn, and master both technical and non-technical skills with curated resources.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="space-y-2">
            <Link to="/home" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/sources" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Sources</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
              <Github size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
              <Twitter size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2026 Skill Circle. Built with ❤️ for learners everywhere.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
