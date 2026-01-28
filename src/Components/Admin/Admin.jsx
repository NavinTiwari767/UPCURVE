import React, { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  Briefcase,
  Home,
  LogOut,
  TrendingUp,
  Plus,
  ChevronRight,
  MessageSquare,
  Mail,
  Menu,
  X,
  Phone, // Added Phone icon
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
    totalContacts: 0,
    newContacts: 0,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchStats();
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
      window.scrollTo(0, 0); // ← Scroll to top
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

    const { data: contacts, error: contactsError } = await supabase
      .from("contacts")
      .select("id, status");

    if (!postsError || !servicesError || !contactsError) {
      const newContactsCount = contacts?.filter(c => c.status === 'new').length || 0;
      
      setStats((prev) => ({
        ...prev,
        totalPosts: posts?.length || 0,
        totalServices: services?.length || 0,
        totalContacts: contacts?.length || 0,
        newContacts: newContactsCount,
      }));
    }
  };

  const handleMenuItemClick = (path) => {
    window.scrollTo(0, 0); // ← Scroll to top on navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    navigate(path);
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
      label: "Contact Manager",
      icon: MessageSquare,
      path: "/admin/contacts",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      badge: stats.newContacts > 0 ? stats.newContacts : null,
    },
    {
      label: "Contact Info",
      icon: Phone, // Phone icon for Contact Info
      path: "/admin/contact-info",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="flex">
        {/* ✅ DESKTOP SIDEBAR - ALWAYS VISIBLE ON DESKTOP */}
        <aside className="hidden lg:flex w-72 bg-white shadow-2xl min-h-screen fixed left-0 top-0 bottom-0 z-40">
          <div className="flex flex-col h-full w-full">
            {/* LOGO/HEADER */}
            <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
              <div>
                <h2 className="text-2xl font-bold text-white">UpCurve</h2>
                <p className="text-purple-100 text-sm">Admin Panel</p>
              </div>
            </div>

            {/* MENU ITEMS */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                    isActive(item.path)
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
                  {item.badge && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={16} />
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

        {/* ✅ MOBILE SIDEBAR - Only on mobile with hamburger */}
        <aside
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
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
                  className="text-white"
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
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                    isActive(item.path)
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
                  {item.badge && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={16} />
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
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}

        {/* ✅ MAIN CONTENT - Adjust for sidebar */}
        <div className="flex-1 min-h-screen lg:ml-72 w-full">
          {/* HEADER */}
          <header className="bg-white shadow-sm border-b sticky top-0 z-30">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {/* Mobile Hamburger Menu Button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
                    Dashboard
                  </h1>
                  <p className="text-xs md:text-sm text-slate-600">
                    Welcome back! Here's what's happening
                  </p>
                </div>
              </div>
              
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="p-3 md:p-6 lg:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
              {/* STATS CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
                  title="Total Contacts"
                  value={stats.totalContacts}
                  icon={MessageSquare}
                  color="orange"
                  trend="+15%"
                />
                <StatCard
                  title="New Messages"
                  value={stats.newContacts}
                  icon={Mail}
                  color="blue"
                  trend="New"
                />
              </div>

              {/* QUICK ACTIONS */}
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                    Quick Actions
                  </h2>
                  <TrendingUp className="text-purple-600" size={20} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <ActionCard
                    onClick={() => handleMenuItemClick("/admin/blog")}
                    icon={Plus}
                    title="Create New Blog Post"
                    description="Write and publish a new article"
                    color="purple"
                  />
                  <ActionCard
                    onClick={() => handleMenuItemClick("/admin/services")}
                    icon={Plus}
                    title="Add New Service"
                    description="Create a new service offering"
                    color="green"
                  />
                  <ActionCard
                    onClick={() => handleMenuItemClick("/admin/contacts")}
                    icon={MessageSquare}
                    title="View Contact Messages"
                    description="Manage contact form submissions"
                    color="orange"
                    badge={stats.newContacts > 0 ? `${stats.newContacts} new` : null}
                  />
                  <ActionCard
                    onClick={() => handleMenuItemClick("/admin/contact-info")}
                    icon={Phone}
                    title="Update Contact Info"
                    description="Manage phone, email, address"
                    color="cyan"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

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
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
    },
    cyan: {
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-200",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white p-4 md:p-5 rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 md:p-3 rounded-lg ${colors.bg}`}>
          <Icon size={20} className={colors.text} />
        </div>
        {trend && (
          <span className="text-xs md:text-sm text-green-600 font-semibold flex items-center gap-1">
            {trend !== 'New' && <TrendingUp size={12} />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs md:text-sm text-slate-600 mb-1">{title}</p>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
};

const ActionCard = ({ onClick, icon: Icon, title, description, color, badge }) => {
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
    orange: {
      border: "border-orange-200",
      hoverBorder: "hover:border-orange-400",
      bg: "hover:bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    cyan: {
      border: "border-cyan-200",
      hoverBorder: "hover:border-cyan-400",
      bg: "hover:bg-cyan-50",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-3 md:p-4 border ${colors.border} ${colors.hoverBorder} ${colors.bg} rounded-xl transition-all text-left w-full`}
    >
      <div className={`p-2 md:p-3 ${colors.iconBg} rounded-lg flex-shrink-0`}>
        <Icon size={20} className={colors.iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm md:text-base line-clamp-1">{title}</h3>
        <p className="text-xs md:text-sm text-slate-600 mt-1 line-clamp-2">{description}</p>
        {badge && (
          <span className="inline-block mt-1 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
            {badge}
          </span>
        )}
      </div>
      <ChevronRight className="text-slate-400 flex-shrink-0" size={16} />
    </button>
  );
};

export default Admin;