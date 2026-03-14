import VideoCard from "@/components/VideoCard";
import Navbar from "@/components/Navbar";
import { techVideos, nonTechVideos } from "@/data/mockData";
import { Code, Users } from "lucide-react";

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

const HomePage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 pt-20 pb-12">
      <Section icon={Code} title="Tech Skills" subtitle="Master the latest technologies">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {techVideos.map(v => <VideoCard key={v.id} video={v} />)}
        </div>
      </Section>
      <Section icon={Users} title="Non-Tech Skills" subtitle="Build essential soft skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {nonTechVideos.map(v => <VideoCard key={v.id} video={v} />)}
        </div>
      </Section>
    </main>
  </div>
);

export default HomePage;
