import { ExternalLink } from "lucide-react";
import type { Resource } from "@/data/mockData";

const ResourceCard = ({ resource }: { resource: Resource }) => (
  <a href={resource.link} target="_blank" rel="noopener noreferrer"
    className="block bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{resource.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
      </div>
      <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-0.5" />
    </div>
  </a>
);

export default ResourceCard;
