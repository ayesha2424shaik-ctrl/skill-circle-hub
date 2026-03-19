import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useGamification } from "@/context/GamificationContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { techSkills, nonTechSkills, skills } from "@/data/mockData";
import { BookOpen, Code, Users, Bell, TrendingUp, MonitorPlay, Sparkles, Trophy, Flame, Star, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const StatCard = ({ icon: Icon, label, value, gradient, delay }: { icon: any; label: string; value: string | number; gradient?: boolean; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="glass-card rounded-xl p-5 hover-lift"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${gradient ? "gradient-bg" : "bg-primary/10"}`}>
        <Icon size={18} className={gradient ? "text-primary-foreground" : "text-primary"} />
      </div>
      <TrendingUp size={14} className="text-emerald-500" />
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { notifications } = useNotifications();
  const { state, nextLevelPoints } = useGamification();
  const { bookmarks } = useBookmarks();
  const navigate = useNavigate();

  const totalVideos = skills.reduce((a, s) => a + s.videos.length, 0);
  const totalResources = skills.reduce((a, s) => a + s.resources.length, 0);
  const totalPlatforms = skills.reduce((a, s) => a + s.platforms.length, 0);
  const progressPercent = Math.min(Math.max((state.points / nextLevelPoints) * 100, 0), 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Hello <span className="gradient-text font-semibold">{user?.name || "User"}</span>, here's your learning overview
          </p>
        </motion.div>

        {/* Level progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center elegant-shadow">
                <Trophy size={22} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Level {state.level} — {state.levelName}</p>
                <p className="text-xs text-muted-foreground">{state.points} / {nextLevelPoints} points</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground flex items-center gap-1"><Flame size={16} className="text-orange-500" /> {state.streak}</p>
                <p className="text-[10px] text-muted-foreground">Day Streak</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground flex items-center gap-1"><Star size={16} className="text-yellow-500" /> {state.badges.filter(b => b.earned).length}</p>
                <p className="text-[10px] text-muted-foreground">Badges</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground flex items-center gap-1"><Target size={16} className="text-primary" /> {Object.keys(state.completedQuizzes).length}</p>
                <p className="text-[10px] text-muted-foreground">Quizzes</p>
              </div>
            </div>
          </div>
          <Progress value={progressPercent} className="h-2.5" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Code} label="Tech Skills" value={techSkills.length} gradient delay={0.1} />
          <StatCard icon={Users} label="Non-Tech Skills" value={nonTechSkills.length} delay={0.15} />
          <StatCard icon={MonitorPlay} label="Videos Watched" value={state.watchedVideos.length + " / " + totalVideos} delay={0.2} />
          <StatCard icon={BookOpen} label="Bookmarked" value={bookmarks.length} gradient delay={0.25} />
        </div>

        {/* Badges showcase */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6 mb-6">
          <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2"><Star size={16} className="text-yellow-500" /> Recent Badges</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {state.badges.filter(b => b.earned).map(badge => (
              <div key={badge.id} className="shrink-0 w-24 text-center p-3 rounded-xl border border-primary/20 bg-primary/5">
                <p className="text-2xl">{badge.icon}</p>
                <p className="text-[10px] font-semibold text-foreground mt-1">{badge.name}</p>
              </div>
            ))}
            {state.badges.filter(b => b.earned).length === 0 && (
              <p className="text-xs text-muted-foreground">Complete quizzes and activities to earn badges!</p>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick access skills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="lg:col-span-2 glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-primary" />
              <h2 className="text-sm font-bold text-foreground">Quick Access</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.slice(0, 6).map(s => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/skill/${s.id}`)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
                >
                  <img src={s.thumbnail} alt={s.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</p>
                    <p className="text-[10px] text-muted-foreground">{s.videos.length} videos</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={16} className="text-primary" />
              <h2 className="text-sm font-bold text-foreground">Notifications</h2>
            </div>
            {notifications.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No notifications yet</p>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 5).map(n => (
                  <div key={n.id} className="p-3 rounded-lg border border-border bg-background/50">
                    <p className="text-xs text-foreground">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
