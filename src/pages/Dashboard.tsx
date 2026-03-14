import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { techVideos, nonTechVideos, techResources, nonTechResources } from "@/data/mockData";
import { BookOpen, Code, Users, Bell } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <div className="bg-card border border-border rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={16} className={color} />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { notifications } = useNotifications();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <h1 className="text-xl font-bold text-foreground mb-1">
          Hello, {user?.name || "User"} 👋
        </h1>
        <p className="text-sm text-muted-foreground mb-6">Here's your learning overview</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <StatCard icon={Code} label="Tech Skills" value={techVideos.length} color="text-primary" />
          <StatCard icon={Users} label="Non-Tech Skills" value={nonTechVideos.length} color="text-secondary" />
          <StatCard icon={BookOpen} label="Resources" value={techResources.length + nonTechResources.length} color="text-primary" />
          <StatCard icon={Bell} label="Notifications" value={notifications.length} color="text-secondary" />
        </div>

        <h2 className="text-sm font-semibold text-foreground mb-3">Recent Notifications</h2>
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {notifications.length === 0 ? (
            <p className="p-4 text-xs text-muted-foreground">No notifications</p>
          ) : (
            notifications.slice(0, 5).map(n => (
              <div key={n.id} className="px-4 py-3">
                <p className="text-xs text-foreground">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
