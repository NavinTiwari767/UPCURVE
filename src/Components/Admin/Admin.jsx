import React, { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  BarChart3,
  Eye,
  Calendar,
  Briefcase,
  Home,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  Plus,
  Edit3,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { signOut } from "../../services/auth";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({
    totalPosts: 0,
    totalServices: 0,
    views: 0,
    comments: 0,
  });

  const [recentPosts, setRecentPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchRecentPosts();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("admin_session");
      localStorage.removeItem("customer_session");
      await signOut();
      console.log("✅ Admin logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/user-auth", { replace: true, state: { isAdmin: true } });
    }
  };

  const fetchStats = async () => {
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id");

    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("id");

    if (!postsError || !servicesError) {
      setStats((prev) => ({
        ...prev,
        totalPosts: posts?.length || 0,
        totalServices: services?.length || 0,
      }));
    }
  };

  const fetchRecentPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error) {
      setRecentPosts(data || []);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: Home,
      path: "/admin",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Blog Manager",
      icon: BookOpen,
      path: "/admin/blog",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Services Manager",
      icon: Briefcase,
      path: "/admin/services",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: "#",
      color: "text-slate-400",
      bgColor: "bg-slate-50",
      disabled: true,
    },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* LOGO/HEADER */}
          <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">UpCurve</h2>
                <p className="text-purple-100 text-sm">Admin Panel</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* MENU ITEMS */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => !item.disabled && handleNavigate(item.path)}
                disabled={item.disabled}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : isActive(item.path)
                    ? `${item.bgColor} ${item.color} font-semibold shadow-md`
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive(item.path) ? item.bgColor : "bg-slate-100"
                  }`}
                >
                  <item.icon size={20} className={item.color} />
                </div>
                <span className="flex-1 text-left">{item.label}</span>
                {item.disabled && (
                  <span className="text-xs bg-slate-200 px-2 py-1 rounded">
                    Soon
                  </span>
                )}
                {!item.disabled && <ChevronRight size={16} />}
              </button>
            ))}
          </nav>

          {/* LOGOUT BUTTON */}
          <div className="p-4 border-t bg-slate-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-semibold"
            >
              <div className="p-2 rounded-lg bg-red-50">
                <LogOut size={20} />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-900"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-600 hidden sm:block">
                  Welcome back! Here's what's happening
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition hidden lg:block"
            >
              Logout
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Total Posts"
                value={stats.totalPosts}
                icon={FileText}
                color="purple"
                trend="+12%"
              />
              <StatCard
                title="Total Services"
                value={stats.totalServices}
                icon={Briefcase}
                color="green"
                trend="+8%"
              />
              <StatCard
                title="Total Views"
                value={stats.views}
                icon={Eye}
                color="blue"
                trend="+23%"
              />
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Quick Actions
                </h2>
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActionCard
                  onClick={() => handleNavigate("/admin/blog")}
                  icon={Plus}
                  title="Create New Blog Post"
                  description="Write and publish a new article"
                  color="purple"
                />
                <ActionCard
                  onClick={() => handleNavigate("/admin/services")}
                  icon={Plus}
                  title="Add New Service"
                  description="Create a new service offering"
                  color="green"
                />
              </div>
            </div>

            {/* RECENT POSTS */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Recent Blog Posts
                </h2>
                <button
                  onClick={() => handleNavigate("/admin/blog")}
                  className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1"
                >
                  View All <ChevronRight size={16} />
                </button>
              </div>

              {recentPosts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText
                    size={48}
                    className="text-slate-300 mx-auto mb-4"
                  />
                  <p className="text-slate-600 mb-4">No posts yet</p>
                  <button
                    onClick={() => handleNavigate("/admin/blog")}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
                  >
                    Create Your First Post
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 hover:bg-purple-50 rounded-xl transition-all border border-transparent hover:border-purple-200 cursor-pointer group"
                      onClick={() =>
                        handleNavigate(`/admin/blog/edit/${post.id}`)
                      }
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition">
                          <FileText size={20} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition">
                            {post.title}
                          </h3>
                          <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                            <Clock size={14} />
                            {new Date(post.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition">
                        <Edit3 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t py-4 px-6 text-center text-sm text-slate-600">
          <p>UpCurve Media Admin Panel • v1.0 • © 2026</p>
        </footer>
      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon size={24} className={colors.text} />
        </div>
        {trend && (
          <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
            <TrendingUp size={14} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
};

const ActionCard = ({ onClick, icon: Icon, title, description, color }) => {
  const colorClasses = {
    purple: {
      border: "border-purple-200",
      hoverBorder: "hover:border-purple-400",
      bg: "hover:bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    green: {
      border: "border-green-200",
      hoverBorder: "hover:border-green-400",
      bg: "hover:bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-5 border-2 ${colors.border} ${colors.hoverBorder} ${colors.bg} rounded-xl transition-all text-left group`}
    >
      <div className={`p-3 ${colors.iconBg} rounded-lg group-hover:scale-110 transition-transform`}>
        <Icon size={24} className={colors.iconColor} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
      </div>
      <ChevronRight className="text-slate-400 group-hover:text-slate-600" size={20} />
    </button>
  );
};

export default Admin;