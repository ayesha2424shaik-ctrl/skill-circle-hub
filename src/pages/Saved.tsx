import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBookmarks } from "@/context/BookmarkContext";
import { skills } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark, BookmarkX, ArrowRight } from "lucide-react";

const Saved = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const navigate = useNavigate();
  const savedSkills = skills.filter(s => bookmarks.includes(s.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Saved Skills</h1>
          <p className="text-sm text-muted-foreground mb-8">Your bookmarked learning resources</p>
        </motion.div>

        {savedSkills.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Bookmark size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-sm mb-2">No saved skills yet</p>
            <button onClick={() => navigate("/home")} className="text-sm text-primary hover:underline">Browse skills →</button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {savedSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all group hover-lift"
              >
                <div className="aspect-video relative overflow-hidden cursor-pointer" onClick={() => navigate(`/skill/${skill.id}`)}>
                  <img src={skill.thumbnail} alt={skill.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${skill.category === "tech" ? "bg-primary/80 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground"}`}>
                    {skill.category === "tech" ? "Tech" : "Non-Tech"}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-bold text-white drop-shadow-md">{skill.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground line-clamp-2">{skill.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => toggleBookmark(skill.id)}
                      className="text-xs text-destructive hover:underline flex items-center gap-1"
                    >
                      <BookmarkX size={12} /> Remove
                    </button>
                    <button onClick={() => navigate(`/skill/${skill.id}`)} className="text-xs text-primary flex items-center gap-1 hover:underline">
                      Learn <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Saved;
