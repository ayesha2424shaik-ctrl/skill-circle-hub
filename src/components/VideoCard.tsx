import { Play } from "lucide-react";
import type { Video } from "@/data/mockData";

const VideoCard = ({ video }: { video: Video }) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
    <div className="aspect-video bg-muted flex items-center justify-center">
      <Play size={24} className="text-muted-foreground" />
    </div>
    <div className="p-3 space-y-1">
      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${video.category === "tech" ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"}`}>
        {video.category === "tech" ? "Tech" : "Non-Tech"}
      </span>
      <h3 className="text-sm font-semibold text-foreground">{video.title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
      <a href={video.videoLink} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-1">
        <Play size={12} /> Watch
      </a>
    </div>
  </div>
);

export default VideoCard;
