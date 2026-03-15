import Navbar from "@/components/Navbar";
import { techSkills, nonTechSkills, Skill } from "@/data/mockData";
import { Code, Users, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const SkillCard = ({ skill }: { skill: Skill }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/skill/${skill.id}`)}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group"
    >
      <div className="aspect-video relative overflow-hidden">
        <img src={skill.thumbnail} alt={skill.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${skill.category === "tech" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
          {skill.category === "tech" ? "Tech" : "Non-Tech"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-foreground">{skill.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{skill.description}</p>
        <div className="flex gap-3 mt-3 text-[10px] text-muted-foreground">
          {skill.videos.length > 0 && <span>{skill.videos.length} Videos</span>}
          {skill.resources.length > 0 && <span>{skill.resources.length} Resources</span>}
          {skill.platforms.length > 0 && <span>{skill.platforms.length} Platforms</span>}
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon: Icon, title, subtitle, children }: { icon: any; title: string; subtitle: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <div className="flex items-center gap-2 mb-4">
      <Icon size={18} className="text-primary" />
      <div>
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    {children}
  </section>
);

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterSkills = (skills: Skill[]) =>
    skills.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredTech = useMemo(() => filterSkills(techSkills), [searchQuery]);
  const filteredNonTech = useMemo(() => filterSkills(nonTechSkills), [searchQuery]);
  const hasResults = filteredTech.length > 0 || filteredNonTech.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search skills..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {!hasResults && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">No skills found matching &quot;{searchQuery}&quot;</p>
            <button onClick={() => setSearchQuery("")} className="text-sm text-primary mt-2 hover:underline">Clear search</button>
          </div>
        ) : (
          <>
            {filteredTech.length > 0 && (
              <Section icon={Code} title="Tech Skills" subtitle="Master the latest technologies">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTech.map(s => <SkillCard key={s.id} skill={s} />)}
                </div>
              </Section>
            )}
            {filteredNonTech.length > 0 && (
              <Section icon={Users} title="Non-Tech Skills" subtitle="Build essential soft skills">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredNonTech.map(s => <SkillCard key={s.id} skill={s} />)}
                </div>
              </Section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
