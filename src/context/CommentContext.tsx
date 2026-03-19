import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Comment {
  id: string;
  skillId: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  parentId?: string;
}

interface CommentContextType {
  getComments: (skillId: string) => Comment[];
  addComment: (skillId: string, userName: string, text: string, parentId?: string) => void;
  deleteComment: (commentId: string) => void;
}

const STORAGE_KEY = "skillcircle_comments";

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useComments = () => {
  const ctx = useContext(CommentContext);
  if (!ctx) throw new Error("useComments must be used within CommentProvider");
  return ctx;
};

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      { id: "c1", skillId: "react", userId: "1", userName: "Alice", text: "React is amazing! The hooks system changed how I think about state management.", timestamp: new Date(Date.now() - 3600000).toISOString() },
      { id: "c2", skillId: "react", userId: "2", userName: "Bob", text: "Great resources here. I'd recommend starting with the official docs.", timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: "c3", skillId: "react", userId: "3", userName: "Carol", text: "Totally agree! The new React docs are excellent.", timestamp: new Date(Date.now() - 1800000).toISOString(), parentId: "c2" },
      { id: "c4", skillId: "javascript", userId: "1", userName: "Alice", text: "JavaScript is the foundation of web development. Learn it well!", timestamp: new Date(Date.now() - 86400000).toISOString() },
    ];
  });

  const save = (c: Comment[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(c));

  const getComments = useCallback((skillId: string) => comments.filter(c => c.skillId === skillId), [comments]);

  const addComment = useCallback((skillId: string, userName: string, text: string, parentId?: string) => {
    setComments(prev => {
      const next = [...prev, { id: Date.now().toString(), skillId, userId: "current", userName, text, timestamp: new Date().toISOString(), parentId }];
      save(next);
      return next;
    });
  }, []);

  const deleteComment = useCallback((commentId: string) => {
    setComments(prev => {
      const next = prev.filter(c => c.id !== commentId && c.parentId !== commentId);
      save(next);
      return next;
    });
  }, []);

  return (
    <CommentContext.Provider value={{ getComments, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};
