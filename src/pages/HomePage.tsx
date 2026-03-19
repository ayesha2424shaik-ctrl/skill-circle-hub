import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { techSkills, nonTechSkills, skills, Skill } from "@/data/mockData";
import { Code, Users, Search, X, Sparkles, ArrowRight, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { motion } from "framer-motion";

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const saved = isBookmarked(skill.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all group hover-lift"
    >
      <div className="aspect-video relative overflow-hidden cursor-pointer" onClick={() => navigate(`/skill/${skill.id}`)}>
        <img src={skill.thumbnail} alt={skill.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${skill.category === "tech" ? "bg-primary/80 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground"}`}>
          {skill.category === "tech" ? "Tech" : "Non-Tech"}
        </span>
        {skill.difficulty && (
          <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm">
            {skill.difficulty}
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-sm font-bold text-white drop-shadow-md">{skill.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground line-clamp-2">{skill.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3 text-[10px] text-muted-foreground">
            {skill.videos.length > 0 && <span className="flex items-center gap-1">📹 {skill.videos.length}</span>}
            {skill.resources.length > 0 && <span className="flex items-center gap-1">📄 {skill.resources.length}</span>}
            {skill.platforms.length > 0 && <span className="flex items-center gap-1">💻 {skill.platforms.length}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); toggleBookmark(skill.id); }}
              className={`transition-colors ${saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
            <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate(`/skill/${skill.id}`)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

type Filter = "all" | "tech" | "nontech";
type Difficulty = "all" | "Beginner" | "Intermediate" | "Advanced";

const HomePage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("all");

  const filterSkills = (allSkills: Skill[]) =>
    allSkills.filter(s =>
      (s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (difficulty === "all" || s.difficulty === difficulty)
    );

  const displayedSkills = useMemo(() => {
    const base = filter === "tech" ? techSkills : filter === "nontech" ? nonTechSkills : skills;
    return filterSkills(base);
  }, [searchQuery, filter, difficulty]);

  const filters: { key: Filter; label: string; icon: any }[] = [
    { key: "all", label: "All Skills", icon: Sparkles },
    { key: "tech", label: "Tech", icon: Code },
    { key: "nontech", label: "Non-Tech", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">{user?.name || "Learner"}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey. Pick a skill to explore.</p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search skills..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-xl border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow" />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  filter === f.key
                    ? "gradient-bg text-primary-foreground elegant-shadow"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <f.icon size={14} />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-2 mb-8">
          {(["all", "Beginner", "Intermediate", "Advanced"] as Difficulty[]).map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                difficulty === d
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {d === "all" ? "All Levels" : d}
            </button>
          ))}
        </div>

        {displayedSkills.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">No skills found matching your filters</p>
            <button onClick={() => { setSearchQuery(""); setFilter("all"); setDifficulty("all"); }} className="text-sm text-primary mt-2 hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedSkills.map((s, i) => <SkillCard key={s.id} skill={s} index={i} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
