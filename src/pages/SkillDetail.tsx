import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { skills } from "@/data/mockData";
import { ArrowLeft, Play, ExternalLink, Code2, BookOpen, MonitorPlay } from "lucide-react";

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const skill = skills.find(s => s.id === skillId);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <button onClick={() => navigate("/home")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Skills
        </button>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="w-full md:w-72 shrink-0">
            <img src={skill.thumbnail} alt={skill.title} className="w-full aspect-video object-cover rounded-xl border border-border" />
          </div>
          <div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${skill.category === "tech" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {skill.category === "tech" ? "Tech" : "Non-Tech"}
            </span>
            <h1 className="text-2xl font-bold text-foreground mt-2">{skill.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
          </div>
        </div>

        {/* Videos Section */}
        {skill.videos.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <MonitorPlay size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Videos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skill.videos.map(v => (
                <a key={v.id} href={v.videoLink} target="_blank" rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Play size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{v.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{v.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Resources Section */}
        {skill.resources.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Documents & Resources</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skill.resources.map(r => (
                <a key={r.id} href={r.link} target="_blank" rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Coding Platforms Section */}
        {skill.platforms.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-foreground">Practice & Coding Platforms</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skill.platforms.map(p => (
                <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer"
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Code2 size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SkillDetail;
