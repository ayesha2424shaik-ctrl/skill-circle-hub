import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (message: string) => void;
  markAllRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", message: "🎉 New skill added: React Fundamentals", time: "Just now", read: false },
    { id: "2", message: "📚 New skill added: Public Speaking", time: "2 min ago", read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((message: string) => {
    setNotifications(prev => [
      { id: Date.now().toString(), message, time: "Just now", read: false },
      ...prev,
    ]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
