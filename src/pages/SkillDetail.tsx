import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { skills } from "@/data/mockData";
import { ArrowLeft, Play, ExternalLink, Code2, BookOpen, MonitorPlay, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type Tab = "videos" | "resources" | "platforms";

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const skill = skills.find(s => s.id === skillId);
  const [activeTab, setActiveTab] = useState<Tab>("videos");

  if (!skill) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-12 text-center">
          <p className="text-muted-foreground">Skill not found.</p>
          <button onClick={() => navigate("/home")} className="text-primary mt-2 hover:underline text-sm">Go back</button>
        </main>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: any; count: number }[] = [
    { key: "videos", label: "Videos", icon: MonitorPlay, count: skill.videos.length },
    { key: "resources", label: "Resources", icon: BookOpen, count: skill.resources.length },
    { key: "platforms", label: "Platforms", icon: Code2, count: skill.platforms.length },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1">
        <button onClick={() => navigate("/home")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Skills
        </button>

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden mb-8"
        >
          <div className="absolute inset-0">
            <img src={skill.thumbnail} alt={skill.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          </div>
          <div className="relative z-10 px-6 md:px-10 py-10 md:py-14">
            <span className={`text-[10px] font-semibold px-3 py-1 rounded-full ${skill.category === "tech" ? "bg-primary/80 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground"}`}>
              {skill.category === "tech" ? "Tech" : "Non-Tech"}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">{skill.title}</h1>
            <p className="text-sm text-white/70 mt-2 max-w-lg">{skill.description}</p>
            <div className="flex gap-5 mt-5">
              {tabs.map(t => (
                <div key={t.key} className="text-center">
                  <p className="text-xl font-bold text-white">{t.count}</p>
                  <p className="text-xs text-white/50">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.filter(t => t.count > 0).map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === t.key
                  ? "gradient-bg text-primary-foreground elegant-shadow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <t.icon size={15} />
              {t.label}
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeTab === t.key ? "bg-white/20" : "bg-muted"}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeTab === "videos" && skill.videos.map((v, i) => (
            <motion.a
              key={v.id}
              href={v.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group hover-lift"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Play size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{v.description}</p>
                </div>
              </div>
            </motion.a>
          ))}

          {activeTab === "resources" && skill.resources.map((r, i) => (
            <motion.a
              key={r.id}
              href={r.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group hover-lift"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <BookOpen size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-1" />
              </div>
            </motion.a>
          ))}

          {activeTab === "platforms" && skill.platforms.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group hover-lift"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Code2 size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SkillDetail;
