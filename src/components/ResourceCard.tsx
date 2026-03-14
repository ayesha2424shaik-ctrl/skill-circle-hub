import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Resource } from "@/data/mockData";

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

const ResourceCard = ({ resource, index }: ResourceCardProps) => {
  const isTech = resource.category === "tech";

  return (
    <motion.a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card p-5 block group transition-shadow duration-300 ${
        isTech ? "hover:glow-violet" : "hover:glow-cyan"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-foreground text-sm">
            {resource.title}
          </h3>
          <p className="text-xs text-muted-foreground">{resource.description}</p>
        </div>
        <ExternalLink
          size={16}
          className={`shrink-0 mt-0.5 transition-colors ${
            isTech ? "text-primary" : "text-secondary"
          } opacity-60 group-hover:opacity-100`}
        />
      </div>
    </motion.a>
  );
};

export default ResourceCard;
