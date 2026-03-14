import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import Navbar from "@/components/Navbar";
import { techVideos, nonTechVideos } from "@/data/mockData";
import { Code, Users } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Tech Skills */}
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
              <h2 className="text-xl font-bold text-foreground">Tech Skills</h2>
              <p className="text-xs text-muted-foreground">Master the latest technologies</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {techVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Non-Tech Skills */}
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
              <h2 className="text-xl font-bold text-foreground">Non-Tech Skills</h2>
              <p className="text-xs text-muted-foreground">Build essential soft skills</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nonTechVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default HomePage;
