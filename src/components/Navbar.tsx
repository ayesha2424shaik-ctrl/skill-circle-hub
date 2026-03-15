import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Home, BookOpen, LayoutDashboard, Menu, X, Bell, PenNib } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };
  if (!user) return null;

  const links = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/sources", label: "Sources", icon: BookOpen },
  ];

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 text-lg font-bold text-primary">
          <PenNib size={20} className="text-primary" />
          Skill Circle
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={linkClass(l.to)}>
              <l.icon size={16} /> {l.label}
            </Link>
          ))}

          {/* Notification bell */}
          <div className="relative ml-2">
            <button
              onClick={() => { setShowNotifs(!showNotifs); if (!showNotifs) markAllRead(); }}
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifs && (
              <div className="absolute right-0 top-10 w-72 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
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

          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-muted transition-colors ml-1">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border px-4 py-2 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className={linkClass(l.to) + " w-full"}>
              <l.icon size={16} /> {l.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-destructive w-full">
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
