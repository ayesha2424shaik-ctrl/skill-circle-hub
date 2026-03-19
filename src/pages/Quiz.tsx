import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { skills } from "@/data/mockData";
import { quizzes } from "@/data/quizData";
import { useGamification } from "@/context/GamificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Quiz = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const skill = skills.find(s => s.id === skillId);
  const quiz = quizzes.find(q => q.skillId === skillId);
  const { completeQuiz, state } = useGamification();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!skill || !quiz) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-12 text-center">
          <p className="text-muted-foreground">{!skill ? "Skill not found." : "No quiz available for this skill yet."}</p>
          <button onClick={() => navigate(-1)} className="text-primary mt-2 hover:underline text-sm">Go back</button>
        </main>
      </div>
    );
  }

  const q = quiz.questions[currentQ];
  const totalQ = quiz.questions.length;
  const previousBest = state.completedQuizzes[skillId!] || 0;

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleSubmitAnswer = () => {
    if (selected === null) return;
    setSubmitted(true);
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setSubmitted(false);
      } else {
        const score = newAnswers.reduce((acc, a, i) => acc + (a === quiz.questions[i].correctIndex ? 1 : 0), 0);
        completeQuiz(skillId!, score, totalQ);
        setShowResult(true);
      }
    }, 1200);
  };

  const score = answers.reduce((acc, a, i) => acc + (a === quiz.questions[i].correctIndex ? 1 : 0), 0);

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setSubmitted(false);
  };

  if (showResult) {
    const percentage = Math.round((score / totalQ) * 100);
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 pt-20 pb-12 flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 elegant-shadow">
              <Trophy size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground text-sm mb-6">{skill.title}</p>

            <div className="text-5xl font-bold gradient-text mb-2">{percentage}%</div>
            <p className="text-sm text-muted-foreground mb-6">
              {score}/{totalQ} correct • +{score * 10} points earned
            </p>

            <div className="space-y-3 mb-6">
              {quiz.questions.map((question, i) => (
                <div key={question.id} className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs ${answers[i] === question.correctIndex ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}>
                  {answers[i] === question.correctIndex ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span className="flex-1">{question.question}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={handleRetry} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                <RotateCcw size={14} /> Retry
              </button>
              <button onClick={() => navigate(`/skill/${skillId}`)} className="flex-1 px-4 py-2.5 rounded-xl gradient-bg text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Back to Skill
              </button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-12 flex-1 max-w-2xl">
        <button onClick={() => navigate(`/skill/${skillId}`)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to {skill.title}
        </button>

        <div className="glass-card rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">Question {currentQ + 1} of {totalQ}</p>
            {previousBest > 0 && <p className="text-xs text-muted-foreground">Best: {previousBest}/{totalQ}</p>}
          </div>
          <Progress value={((currentQ + 1) / totalQ) * 100} className="h-2 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold text-foreground mb-6">{q.question}</h2>
              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let cls = "border-border hover:border-primary/30 hover:bg-primary/5";
                  if (submitted) {
                    if (i === q.correctIndex) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-700";
                    else if (i === selected) cls = "border-destructive bg-destructive/10 text-destructive";
                  } else if (i === selected) {
                    cls = "border-primary bg-primary/10";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={submitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${cls}`}
                    >
                      <span className="font-medium mr-2 text-muted-foreground">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                      {submitted && i === q.correctIndex && <CheckCircle size={16} className="inline ml-2 text-emerald-500" />}
                      {submitted && i === selected && i !== q.correctIndex && <XCircle size={16} className="inline ml-2 text-destructive" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handleSubmitAnswer}
          disabled={selected === null || submitted}
          className="w-full py-3 rounded-xl gradient-bg text-primary-foreground font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-all elegant-shadow"
        >
          {currentQ === totalQ - 1 ? "Finish Quiz" : "Submit Answer"}
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
