import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";
import { skills } from "@/data/mockData";
import { Code, Users } from "lucide-react";
import { motion } from "framer-motion";

const allResources = skills.flatMap(s => s.resources.map(r => ({ ...r, skillTitle: s.title, category: s.category })));
const techResources = allResources.filter(r => r.category === "tech");
const nonTechResources = allResources.filter(r => r.category === "nontech");

const Sources = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="container mx-auto px-4 pt-20 pb-12 flex-1">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Sources</h1>
        <p className="text-sm text-muted-foreground mb-8">All curated learning resources in one place</p>
      </motion.div>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Code size={16} className="text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Tech Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {techResources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>
      </section>
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Users size={16} className="text-secondary-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Non-Tech Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {nonTechResources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Sources;
