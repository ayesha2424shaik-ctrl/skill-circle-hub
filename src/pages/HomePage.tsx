import VideoCard from "@/components/VideoCard";
import Navbar from "@/components/Navbar";
import { techVideos, nonTechVideos, Video } from "@/data/mockData";
import { Code, Users, Search, X } from "lucide-react";
import { useState, useMemo } from "react";

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

  const filterVideos = (videos: Video[]) =>
    videos.filter(v =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredTech = useMemo(() => filterVideos(techVideos), [searchQuery]);
  const filteredNonTech = useMemo(() => filterVideos(nonTechVideos), [searchQuery]);

  const hasResults = filteredTech.length > 0 || filteredNonTech.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground mt-2">
              Found {filteredTech.length + filteredNonTech.length} results
            </p>
          )}
        </div>

        {!hasResults && searchQuery ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">No skills found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-sm text-primary mt-2 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            {filteredTech.length > 0 && (
              <Section icon={Code} title="Tech Skills" subtitle="Master the latest technologies">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredTech.map(v => <VideoCard key={v.id} video={v} />)}
                </div>
              </Section>
            )}
            {filteredNonTech.length > 0 && (
              <Section icon={Users} title="Non-Tech Skills" subtitle="Build essential soft skills">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredNonTech.map(v => <VideoCard key={v.id} video={v} />)}
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