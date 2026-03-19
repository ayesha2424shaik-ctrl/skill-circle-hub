import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export interface GamificationState {
  points: number;
  level: number;
  levelName: string;
  streak: number;
  lastActiveDate: string;
  completedSkills: string[];
  completedQuizzes: Record<string, number>;
  watchedVideos: string[];
  badges: Badge[];
}

const LEVELS = [
  { min: 0, name: "Beginner" },
  { min: 100, name: "Learner" },
  { min: 300, name: "Intermediate" },
  { min: 600, name: "Advanced" },
  { min: 1000, name: "Expert" },
  { min: 2000, name: "Master" },
];

const DEFAULT_BADGES: Badge[] = [
  { id: "first-login", name: "First Steps", description: "Logged in for the first time", icon: "🚀", earned: true, earnedAt: new Date().toISOString() },
  { id: "first-quiz", name: "Quiz Taker", description: "Complete your first quiz", icon: "📝", earned: false },
  { id: "perfect-score", name: "Perfect Score", description: "Score 100% on a quiz", icon: "🏆", earned: false },
  { id: "5-videos", name: "Video Learner", description: "Watch 5 videos", icon: "🎬", earned: false },
  { id: "3-day-streak", name: "On Fire", description: "3-day learning streak", icon: "🔥", earned: false },
  { id: "7-day-streak", name: "Unstoppable", description: "7-day learning streak", icon: "⚡", earned: false },
  { id: "5-skills", name: "Skill Collector", description: "Complete 5 skills", icon: "⭐", earned: false },
  { id: "bookworm", name: "Bookworm", description: "Bookmark 5 skills", icon: "📚", earned: false },
];

const getLevel = (points: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].min) return { level: i + 1, levelName: LEVELS[i].name };
  }
  return { level: 1, levelName: "Beginner" };
};

const STORAGE_KEY = "skillcircle_gamification";

const getInitialState = (): GamificationState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Check streak
    const today = new Date().toDateString();
    const lastActive = new Date(parsed.lastActiveDate).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastActive !== today && lastActive !== yesterday) {
      parsed.streak = 0; // Reset streak
    }
    if (lastActive !== today) {
      parsed.streak += 1;
      parsed.lastActiveDate = new Date().toISOString();
      parsed.points += 5; // Daily login bonus
    }
    const { level, levelName } = getLevel(parsed.points);
    parsed.level = level;
    parsed.levelName = levelName;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  }
  const init: GamificationState = {
    points: 10,
    level: 1,
    levelName: "Beginner",
    streak: 1,
    lastActiveDate: new Date().toISOString(),
    completedSkills: [],
    completedQuizzes: {},
    watchedVideos: [],
    badges: [...DEFAULT_BADGES],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
  return init;
};

interface GamificationContextType {
  state: GamificationState;
  addPoints: (amount: number) => void;
  completeQuiz: (skillId: string, score: number, total: number) => void;
  watchVideo: (videoId: string) => void;
  earnBadge: (badgeId: string) => void;
  nextLevelPoints: number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GamificationState>(getInitialState);

  const save = useCallback((s: GamificationState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }, []);

  const addPoints = useCallback((amount: number) => {
    setState(prev => {
      const points = prev.points + amount;
      const { level, levelName } = getLevel(points);
      const next = { ...prev, points, level, levelName };
      save(next);
      return next;
    });
  }, [save]);

  const earnBadge = useCallback((badgeId: string) => {
    setState(prev => {
      const badges = prev.badges.map(b =>
        b.id === badgeId && !b.earned ? { ...b, earned: true, earnedAt: new Date().toISOString() } : b
      );
      const next = { ...prev, badges };
      save(next);
      return next;
    });
  }, [save]);

  const completeQuiz = useCallback((skillId: string, score: number, total: number) => {
    setState(prev => {
      const completedQuizzes = { ...prev.completedQuizzes, [skillId]: Math.max(prev.completedQuizzes[skillId] || 0, score) };
      const points = prev.points + score * 10;
      const { level, levelName } = getLevel(points);
      const badges = [...prev.badges];
      // First quiz badge
      const fq = badges.find(b => b.id === "first-quiz");
      if (fq && !fq.earned) { fq.earned = true; fq.earnedAt = new Date().toISOString(); }
      // Perfect score badge
      if (score === total) {
        const ps = badges.find(b => b.id === "perfect-score");
        if (ps && !ps.earned) { ps.earned = true; ps.earnedAt = new Date().toISOString(); }
      }
      const next = { ...prev, completedQuizzes, points, level, levelName, badges };
      save(next);
      return next;
    });
  }, [save]);

  const watchVideo = useCallback((videoId: string) => {
    setState(prev => {
      if (prev.watchedVideos.includes(videoId)) return prev;
      const watchedVideos = [...prev.watchedVideos, videoId];
      const points = prev.points + 5;
      const { level, levelName } = getLevel(points);
      const badges = [...prev.badges];
      if (watchedVideos.length >= 5) {
        const vb = badges.find(b => b.id === "5-videos");
        if (vb && !vb.earned) { vb.earned = true; vb.earnedAt = new Date().toISOString(); }
      }
      const next = { ...prev, watchedVideos, points, level, levelName, badges };
      save(next);
      return next;
    });
  }, [save]);

  const currentLevelIdx = LEVELS.findIndex((_, i) => i + 1 === state.level);
  const nextLevelPoints = currentLevelIdx < LEVELS.length - 1 ? LEVELS[currentLevelIdx + 1].min : LEVELS[LEVELS.length - 1].min;

  return (
    <GamificationContext.Provider value={{ state, addPoints, completeQuiz, watchVideo, earnBadge, nextLevelPoints }}>
      {children}
    </GamificationContext.Provider>
  );
};
