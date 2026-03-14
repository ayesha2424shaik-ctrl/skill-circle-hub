import Navbar from "@/components/Navbar";
import ResourceCard from "@/components/ResourceCard";
import { techResources, nonTechResources } from "@/data/mockData";
import { Code, Users } from "lucide-react";

const Sources = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 pt-20 pb-12">
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Code size={18} className="text-primary" />
          <h2 className="text-lg font-bold text-foreground">Tech Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {techResources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Users size={18} className="text-secondary" />
          <h2 className="text-lg font-bold text-foreground">Non-Tech Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nonTechResources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>
      </section>
    </main>
  </div>
);

export default Sources;
