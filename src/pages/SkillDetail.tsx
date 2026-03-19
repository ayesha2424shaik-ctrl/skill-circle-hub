import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { skills } from "@/data/mockData";
import { quizzes } from "@/data/quizData";
import { ArrowLeft, Play, ExternalLink, Code2, BookOpen, MonitorPlay, FileText, BookMarked, ScrollText, Newspaper, Bookmark, BookmarkCheck, MessageCircle, Send, Reply, Trash2, Award } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useBookmarks } from "@/context/BookmarkContext";
import { useComments } from "@/context/CommentContext";
import { useAuth } from "@/context/AuthContext";
import { useGamification } from "@/context/GamificationContext";

type Tab = "videos" | "resources" | "documentation" | "platforms" | "discussion";

const SkillDetail = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const skill = skills.find(s => s.id === skillId);
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { getComments, addComment } = useComments();
  const { user } = useAuth();
  const { watchVideo, state } = useGamification();
  const hasQuiz = quizzes.some(q => q.skillId === skillId);
  const quizScore = state.completedQuizzes[skillId!];

  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  if (!skill) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-12 text-center">
          <p className="text-muted-foreground">Skill not found.</p>
          <button onClick={() => navigate("/home")} className="text-primary mt-2 hover:underline text-sm">Go back</button>
        </main>
      </div>
    );
  }

  const saved = isBookmarked(skill.id);
  const comments = getComments(skill.id);
  const topComments = comments.filter(c => !c.parentId);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(skill.id, user?.name || "Anonymous", commentText.trim());
    setCommentText("");
  };

  const handleReply = (parentId: string) => {
    if (!replyText.trim()) return;
    addComment(skill.id, user?.name || "Anonymous", replyText.trim(), parentId);
    setReplyText("");
    setReplyTo(null);
  };

  const handleVideoClick = (videoId: string, link: string) => {
    watchVideo(videoId);
    window.open(link, "_blank");
  };

  const tabs: { key: Tab; label: string; icon: any; count: number }[] = [
    { key: "videos", label: "Videos", icon: MonitorPlay, count: skill.videos.length },
    { key: "documentation", label: "Docs", icon: FileText, count: skill.documentation.length },
    { key: "resources", label: "Resources", icon: BookOpen, count: skill.resources.length },
    { key: "platforms", label: "Platforms", icon: Code2, count: skill.platforms.length },
    { key: "discussion", label: "Discussion", icon: MessageCircle, count: topComments.length },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/home")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Skills
          </button>
          <div className="flex items-center gap-2">
            {hasQuiz && (
              <button
                onClick={() => navigate(`/quiz/${skill.id}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium gradient-bg text-primary-foreground elegant-shadow hover:opacity-90 transition-opacity"
              >
                <Award size={14} /> {quizScore !== undefined ? `Quiz (Best: ${quizScore})` : "Take Quiz"}
              </button>
            )}
            <button onClick={() => toggleBookmark(skill.id)} className={`p-2 rounded-xl border transition-all ${saved ? "border-primary/30 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-primary"}`}>
              {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
        </div>

        {/* Hero header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <img src={skill.thumbnail} alt={skill.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          </div>
          <div className="relative z-10 px-6 md:px-10 py-10 md:py-14">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-semibold px-3 py-1 rounded-full ${skill.category === "tech" ? "bg-primary/80 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground"}`}>
                {skill.category === "tech" ? "Tech" : "Non-Tech"}
              </span>
              {skill.difficulty && (
                <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-white/20 text-white">
                  {skill.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">{skill.title}</h1>
            <p className="text-sm text-white/70 mt-2 max-w-lg">{skill.description}</p>
            <div className="flex gap-5 mt-5">
              {tabs.map(t => (
                <div key={t.key} className="text-center">
                  <p className="text-xl font-bold text-white">{t.count}</p>
                  <p className="text-xs text-white/50">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.filter(t => t.key === "discussion" || t.count > 0).map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === t.key
                  ? "gradient-bg text-primary-foreground elegant-shadow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <t.icon size={15} />
              {t.label}
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeTab === t.key ? "bg-white/20" : "bg-muted"}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === "discussion" ? (
            <div className="max-w-2xl">
              {/* Add comment */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:ring-1 focus:ring-primary"
                  maxLength={500}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-bg text-primary-foreground text-xs font-medium disabled:opacity-50 hover:opacity-90 transition-opacity"
                  >
                    <Send size={12} /> Comment
                  </button>
                </div>
              </div>

              {/* Comments list */}
              {topComments.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">No comments yet. Be the first to share your thoughts!</p>
              ) : (
                <div className="space-y-4">
                  {topComments.map(comment => {
                    const replies = comments.filter(c => c.parentId === comment.id);
                    return (
                      <div key={comment.id} className="glass-card rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
                            {comment.userName[0].toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-semibold text-foreground">{comment.userName}</p>
                              <p className="text-[10px] text-muted-foreground">{new Date(comment.timestamp).toLocaleDateString()}</p>
                            </div>
                            <p className="text-sm text-foreground mt-1">{comment.text}</p>
                            <button
                              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary mt-2 transition-colors"
                            >
                              <Reply size={10} /> Reply {replies.length > 0 && `(${replies.length})`}
                            </button>
                          </div>
                        </div>

                        {/* Replies */}
                        {replies.length > 0 && (
                          <div className="ml-11 mt-3 space-y-3 border-l-2 border-border pl-4">
                            {replies.map(reply => (
                              <div key={reply.id} className="flex items-start gap-2">
                                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                                  {reply.userName[0].toUpperCase()}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-[10px] font-semibold text-foreground">{reply.userName}</p>
                                    <p className="text-[10px] text-muted-foreground">{new Date(reply.timestamp).toLocaleDateString()}</p>
                                  </div>
                                  <p className="text-xs text-foreground mt-0.5">{reply.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply input */}
                        {replyTo === comment.id && (
                          <div className="ml-11 mt-3 flex gap-2">
                            <input
                              value={replyText}
                              onChange={e => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              className="flex-1 px-3 py-1.5 rounded-lg bg-muted border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                              onKeyDown={e => e.key === "Enter" && handleReply(comment.id)}
                              maxLength={300}
                            />
                            <button onClick={() => handleReply(comment.id)} disabled={!replyText.trim()} className="px-3 py-1.5 rounded-lg gradient-bg text-primary-foreground text-[10px] font-medium disabled:opacity-50">
                              Reply
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTab === "videos" && skill.videos.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleVideoClick(v.id, v.videoLink)}
                  className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group hover-lift cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${state.watchedVideos.includes(v.id) ? "bg-emerald-500/20" : "gradient-bg"}`}>
                      <Play size={18} className={state.watchedVideos.includes(v.id) ? "text-emerald-600" : "text-primary-foreground"} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{v.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{v.description}</p>
                      {state.watchedVideos.includes(v.id) && <span className="text-[10px] text-emerald-600 font-medium">✓ Watched</span>}
                    </div>
                  </div>
                </motion.div>
              ))}

              {activeTab === "resources" && skill.resources.map((r, i) => (
                <motion.a key={r.id} href={r.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group hover-lift">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"><BookOpen size={18} className="text-primary" /></div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-1" />
                  </div>
                </motion.a>
              ))}

              {activeTab === "documentation" && skill.documentation.map((d, i) => {
                const typeConfig: Record<string, { icon: typeof BookMarked; color: string }> = {
                  official: { icon: BookMarked, color: "bg-primary/10 text-primary" },
                  guide: { icon: BookOpen, color: "bg-emerald-500/10 text-emerald-600" },
                  cheatsheet: { icon: ScrollText, color: "bg-amber-500/10 text-amber-600" },
                  book: { icon: FileText, color: "bg-blue-500/10 text-blue-600" },
                  article: { icon: Newspaper, color: "bg-rose-500/10 text-rose-600" },
                };
                const cfg = typeConfig[d.type] || typeConfig.article;
                const Icon = cfg.icon;
                return (
                  <motion.a key={d.id} href={d.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group hover-lift">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${cfg.color}`}><Icon size={18} /></div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{d.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{d.description}</p>
                          <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>{d.type.charAt(0).toUpperCase() + d.type.slice(1)}</span>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-1" />
                    </div>
                  </motion.a>
                );
              })}

              {activeTab === "platforms" && skill.platforms.map((p, i) => (
                <motion.a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all group hover-lift">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"><Code2 size={18} className="text-primary" /></div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SkillDetail;
