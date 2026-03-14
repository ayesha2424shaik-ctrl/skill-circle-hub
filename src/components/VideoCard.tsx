import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Video } from "@/data/mockData";

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  const isTech = video.category === "tech";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card overflow-hidden group cursor-pointer transition-shadow duration-300 ${
        isTech ? "hover:glow-violet" : "hover:glow-cyan"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-card to-background overflow-hidden">
        <div
          className={`absolute inset-0 opacity-30 ${
            isTech
              ? "bg-gradient-to-br from-primary/40 to-transparent"
              : "bg-gradient-to-br from-secondary/40 to-transparent"
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
              isTech ? "bg-primary/30" : "bg-secondary/30"
            }`}
          >
            <Play
              size={24}
              className={isTech ? "text-primary" : "text-secondary"}
              fill="currentColor"
            />
          </div>
        </div>
        <div
          className={`absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-semibold ${
            isTech
              ? "bg-primary/20 text-primary"
              : "bg-secondary/20 text-secondary"
          }`}
        >
          {isTech ? "Tech" : "Non-Tech"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground text-sm leading-tight">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {video.description}
        </p>
        <a
          href={video.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-xs font-medium mt-1 transition-colors ${
            isTech
              ? "text-primary hover:text-primary/80"
              : "text-secondary hover:text-secondary/80"
          }`}
        >
          <Play size={12} />
          Watch Now
        </a>
      </div>
    </motion.div>
  );
};

export default VideoCard;
