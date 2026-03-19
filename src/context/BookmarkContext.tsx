import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (skillId: string) => void;
  isBookmarked: (skillId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
};

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const stored = localStorage.getItem("skillcircle_bookmarks");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleBookmark = useCallback((skillId: string) => {
    setBookmarks(prev => {
      const next = prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId];
      localStorage.setItem("skillcircle_bookmarks", JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((skillId: string) => bookmarks.includes(skillId), [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};
