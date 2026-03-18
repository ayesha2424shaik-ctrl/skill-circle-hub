import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { skills } from "@/data/mockData";
import type { Documentation } from "@/data/mockData";
import { Code, Users, Search, BookOpen, FileText, ExternalLink, BookMarked, ScrollText, Newspaper, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

type SourceTab = "all" | "documentation" | "resources" | "platforms";

const docTypeConfig: Record<Documentation["type"], { label: string; icon: typeof BookOpen; color: string }> = {
  official: { label: "Official", icon: BookMarked, color: "bg-primary/15 text-primary" },
  guide: { label: "Guide", icon: BookOpen, color: "bg-emerald-500/15 text-emerald-600" },
  cheatsheet: { label: "Cheatsheet", icon: ScrollText, color: "bg-amber-500/15 text-amber-600" },
  book: { label: "Book", icon: FileText, color: "bg-blue-500/15 text-blue-600" },
  article: { label: "Article", icon: Newspaper, color: "bg-rose-500/15 text-rose-600" },
};

const Sources = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<SourceTab>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "tech" | "nontech">("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return skills
      .filter(s => categoryFilter === "all" || s.category === categoryFilter)
      .map(s => ({
        ...s,
        documentation: s.documentation.filter(d => !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)),
        resources: s.resources.filter(r => !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)),
        platforms: s.platforms.filter(p => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
      }))
      .filter(s => s.documentation.length > 0 || s.resources.length > 0 || s.platforms.length > 0);
  }, [search, categoryFilter]);

  const totalDocs = filtered.reduce((a, s) => a + s.documentation.length, 0);
  const totalResources = filtered.reduce((a, s) => a + s.resources.length, 0);
  const totalPlatforms = filtered.reduce((a, s) => a + s.platforms.length, 0);

  const tabs: { key: SourceTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: totalDocs + totalResources + totalPlatforms },
    { key: "documentation", label: "Documentation", count: totalDocs },
    { key: "resources", label: "Resources", count: totalResources },
    { key: "platforms", label: "Platforms", count: totalPlatforms },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Sources & Documentation</h1>
          <p className="text-sm text-muted-foreground">All curated learning resources, official docs, and practice platforms in one place</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation, resources, platforms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-muted-foreground" />
            {(["all", "tech", "nontech"] as const).map(c => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  categoryFilter === c
                    ? "gradient-bg text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c === "all" ? "All" : c === "tech" ? "Tech" : "Non-Tech"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === t.key
                  ? "gradient-bg text-primary-foreground elegant-shadow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === t.key ? "bg-white/20" : "bg-muted"}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content by Skill */}
        <div className="space-y-10">
          {filtered.map((skill, si) => {
            const showDocs = (activeTab === "all" || activeTab === "documentation") && skill.documentation.length > 0;
            const showRes = (activeTab === "all" || activeTab === "resources") && skill.resources.length > 0;
            const showPlat = (activeTab === "all" || activeTab === "platforms") && skill.platforms.length > 0;
            if (!showDocs && !showRes && !showPlat) return null;

            return (
              <motion.section
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.05 }}
              >
                {/* Skill header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <img src={skill.thumbnail} alt={skill.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">{skill.title}</h2>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      skill.category === "tech" ? "bg-primary/15 text-primary" : "bg-secondary text-secondary-foreground"
                    }`}>
                      {skill.category === "tech" ? "Tech" : "Non-Tech"}
                    </span>
                  </div>
                </div>

                {/* Documentation */}
                {showDocs && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={14} className="text-primary" />
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Documentation</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {skill.documentation.map((doc, i) => {
                        const cfg = docTypeConfig[doc.type];
                        const Icon = cfg.icon;
                        return (
                          <motion.a
                            key={doc.id}
                            href={doc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all group hover-lift"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.color}`}>
                                  <Icon size={16} />
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{doc.title}</h4>
                                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{doc.description}</p>
                                  <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>
                                    {cfg.label}
                                  </span>
                                </div>
                              </div>
                              <ExternalLink size={12} className="text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Resources */}
                {showRes && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-primary" />
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {skill.resources.map((r, i) => (
                        <motion.a
                          key={r.id}
                          href={r.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all group hover-lift"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <BookOpen size={16} className="text-primary" />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                              </div>
                            </div>
                            <ExternalLink size={12} className="text-muted-foreground shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Platforms */}
                {showPlat && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code size={14} className="text-primary" />
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platforms</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {skill.platforms.map((p, i) => (
                        <motion.a
                          key={p.id}
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="glass-card rounded-xl p-4 hover:border-primary/30 transition-all group hover-lift"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                              <Code size={16} className="text-primary" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="mt-6 border-b border-border/50" />
              </motion.section>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={40} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">No results found. Try a different search term.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Sources;
