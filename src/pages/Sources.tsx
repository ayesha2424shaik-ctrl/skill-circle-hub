import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ResourceCard from "@/components/ResourceCard";
import { techResources, nonTechResources } from "@/data/mockData";
import { Code, Users } from "lucide-react";

const Sources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Tech Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Code size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Tech Learning Resources</h2>
              <p className="text-xs text-muted-foreground">Curated links to level up your tech skills</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techResources.map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Non-Tech Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Users size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Non-Tech Learning Resources</h2>
              <p className="text-xs text-muted-foreground">Grow your communication and leadership skills</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nonTechResources.map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Sources;
