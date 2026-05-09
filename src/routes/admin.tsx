import { createFileRoute, Link, Outlet, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Briefcase, 
  MessageSquare, 
  LogOut, 
  ChevronRight, 
  Home,
  Settings,
  Bell,
  Search,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { authApi } from "@/api/auth";
import logo from "@/assets/Gracelogo.webp";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("auth_token");
    if (!token && location.pathname !== "/admin/login") {
      throw redirect({
        to: "/admin/login",
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const token = localStorage.getItem("auth_token");
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = () => {
    authApi.logout();
    toast.success("Signed out successfully");
    navigate({ to: "/admin/login" });
  };

  if (isLoginPage && !token) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Outlet />
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
    { label: "Hero Slider", icon: ImageIcon, to: "/admin/hero" },
    { label: "Services", icon: Briefcase, to: "/admin/services" },
    { label: "Clinic Gallery", icon: ImageIcon, to: "/admin/gallery" },
    { label: "Testimonials", icon: MessageSquare, to: "/admin/testimonials" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex text-zinc-900 font-sans selection:bg-aurora/10">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="relative z-50 bg-white border-r border-zinc-200/80 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="h-20 flex items-center px-6 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
              <img src={logo} alt="Grace" className="h-full w-full object-contain p-1" />
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden"
                >
                  <span className="block font-display font-bold text-lg tracking-tight whitespace-nowrap">Grace Admin</span>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Clinic Management</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-aurora" : ""}`} />
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-semibold text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
                {isActive && isSidebarOpen && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-aurora"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 border-t border-zinc-100 bg-zinc-50/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50/50 transition-all group"
          >
            <LogOut className="h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="font-semibold text-sm">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all border border-zinc-200"
            >
              <div className={`w-5 h-0.5 bg-zinc-900 transition-all ${isSidebarOpen ? "mb-1" : "mb-1.5"}`}></div>
              <div className={`w-3.5 h-0.5 bg-zinc-900 transition-all ${isSidebarOpen ? "mb-1" : "mb-1.5"}`}></div>
              <div className="w-5 h-0.5 bg-zinc-900"></div>
            </button>
            <div className="hidden lg:flex items-center gap-2 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-200 w-80">
              <Search className="h-4 w-4 text-zinc-400" />
              <input type="text" placeholder="Search management..." className="bg-transparent border-none text-sm focus:ring-0 w-full" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-full hover:bg-zinc-50 flex items-center justify-center transition-colors relative">
                <Bell className="h-5 w-5 text-zinc-500" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-aurora rounded-full border-2 border-white"></span>
              </button>
              <button className="h-10 w-10 rounded-full hover:bg-zinc-50 flex items-center justify-center transition-colors">
                <Settings className="h-5 w-5 text-zinc-500" />
              </button>
            </div>
            
            <div className="h-10 w-[1px] bg-zinc-200"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-zinc-900">Admin User</div>
                <div className="text-[10px] font-bold text-aurora uppercase tracking-wider">Super Admin</div>
              </div>
              <div className="h-11 w-11 rounded-2xl bg-zinc-100 border border-zinc-200 p-0.5 shadow-sm overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                  alt="Admin" 
                  className="h-full w-full object-cover rounded-[14px]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8 custom-scrollbar relative">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
