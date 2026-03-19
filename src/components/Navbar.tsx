import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Home, BookOpen, LayoutDashboard, Menu, X, Bell, User, Bookmark, Sun, Moon } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";
import { useGamification } from "@/context/GamificationContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { state } = useGamification();

  const handleLogout = () => { logout(); navigate("/"); };
  if (!user) return null;

  const links = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/sources", label: "Sources", icon: BookOpen },
    { to: "/saved", label: "Saved", icon: Bookmark },
  ];

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
      location.pathname === path ? "gradient-bg text-primary-foreground elegant-shadow" : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 text-lg font-bold">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <img src={logo} alt="Skill Circle" className="w-5 h-5 brightness-0 invert" />
          </div>
          <span className="gradient-text hidden sm:inline">Skill Circle</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={linkClass(l.to)}>
              <l.icon size={16} /> {l.label}
            </Link>
          ))}

          {/* Level badge */}
          <div className="ml-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold">
            Lv.{state.level} • {state.points}pts
          </div>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all ml-1">
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifs(!showNotifs); if (!showNotifs) markAllRead(); }}
              className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifs && (
              <div className="absolute right-0 top-10 w-72 glass-card rounded-xl overflow-hidden z-50">
                <div className="px-3 py-2 border-b border-border text-xs font-medium text-muted-foreground">Notifications</div>
                {notifications.length === 0 ? (
                  <p className="p-3 text-xs text-muted-foreground">No notifications yet</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`px-3 py-2 border-b border-border last:border-0 ${!n.read ? "bg-primary/5" : ""}`}>
                        <p className="text-xs text-foreground">{n.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile */}
          <Link to="/profile" className={`p-2 rounded-xl transition-all ${location.pathname === "/profile" ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
            <User size={16} />
          </Link>

          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-muted transition-all ml-1">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleTheme} className="p-2 rounded-xl text-muted-foreground">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border px-4 py-2 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className={linkClass(l.to) + " w-full"}>
              <l.icon size={16} /> {l.label}
            </Link>
          ))}
          <Link to="/profile" onClick={() => setMobileOpen(false)} className={linkClass("/profile") + " w-full"}>
            <User size={16} /> Profile
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive w-full">
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
