import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";
import { useBookmarks } from "@/context/BookmarkContext";
import { motion } from "framer-motion";
import { User, Mail, Edit2, Save, X, Trophy, Flame, Star, Bookmark } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  const { user } = useAuth();
  const { state, nextLevelPoints } = useGamification();
  const { bookmarks } = useBookmarks();
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem("skillcircle_profile");
    return stored ? JSON.parse(stored) : {
      bio: "Passionate learner exploring tech and soft skills.",
      avatar: "",
    };
  });

  const [editBio, setEditBio] = useState(profile.bio);

  const handleSave = () => {
    const updated = { ...profile, bio: editBio };
    setProfile(updated);
    localStorage.setItem("skillcircle_profile", JSON.stringify(updated));
    setEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...profile, avatar: reader.result as string };
      setProfile(updated);
      localStorage.setItem("skillcircle_profile", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  const levelProgress = ((state.points - (nextLevelPoints > state.points ? nextLevelPoints - (nextLevelPoints - state.points) : state.points)) / nextLevelPoints) * 100;
  const progressPercent = Math.min(Math.max((state.points / nextLevelPoints) * 100, 0), 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Card */}
          <div className="glass-card rounded-2xl p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center overflow-hidden elegant-shadow">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-primary-foreground" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Edit2 size={16} className="text-white" />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-foreground">{user?.name || "User"}</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center sm:justify-start mt-1">
                  <Mail size={14} /> {user?.email}
                </p>
                {editing ? (
                  <div className="mt-3 flex items-start gap-2">
                    <textarea
                      value={editBio}
                      onChange={e => setEditBio(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm text-foreground resize-none h-20 focus:outline-none focus:ring-1 focus:ring-primary"
                      maxLength={200}
                    />
                    <div className="flex flex-col gap-1">
                      <button onClick={handleSave} className="p-2 rounded-lg gradient-bg text-primary-foreground"><Save size={14} /></button>
                      <button onClick={() => { setEditing(false); setEditBio(profile.bio); }} className="p-2 rounded-lg bg-muted text-muted-foreground"><X size={14} /></button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    <button onClick={() => setEditing(true)} className="text-xs text-primary hover:underline mt-1 flex items-center gap-1">
                      <Edit2 size={10} /> Edit Bio
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Level & Progress */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Current Level</p>
                <p className="text-lg font-bold gradient-text">Level {state.level} — {state.levelName}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Points</p>
                <p className="text-lg font-bold text-foreground">{state.points}</p>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">{nextLevelPoints - state.points} points to next level</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { icon: Trophy, label: "Quizzes Done", value: Object.keys(state.completedQuizzes).length, color: "text-amber-500" },
              { icon: Flame, label: "Day Streak", value: state.streak, color: "text-orange-500" },
              { icon: Star, label: "Badges Earned", value: state.badges.filter(b => b.earned).length, color: "text-yellow-500" },
              { icon: Bookmark, label: "Bookmarked", value: bookmarks.length, color: "text-primary" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-4 text-center"
              >
                <s.icon size={20} className={`mx-auto mb-2 ${s.color}`} />
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Badges */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">🏅 Badges</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {state.badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    badge.earned ? "border-primary/30 bg-primary/5" : "border-border opacity-40"
                  }`}
                >
                  <p className="text-2xl mb-1">{badge.icon}</p>
                  <p className="text-xs font-semibold text-foreground">{badge.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
