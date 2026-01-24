import React, { useEffect, useState } from "react";
import {
  BookOpen,
  ArrowRight,
  FileText,
  BarChart3,
  MessageSquare,
  Eye,
  Calendar,
  Users,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { signOut } from "../../services/auth";

const Admin = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPosts: 0,
    totalServices: 0,
    views: 0,
    comments: 0,
  });

  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentPosts();
  }, []);

  // 🔐 LOGOUT HANDLER
  const handleLogout = async () => {
    await signOut();          // Supabase session clear
    navigate("/login");      // Redirect to login
  };

  const fetchStats = async () => {
    // Fetch total posts
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id");

    // Fetch total services
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
      .limit(3);

    if (!error) {
      setRecentPosts(data || []);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6 md:p-10">

        {/* HEADER */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600">
              Manage your website content efficiently
            </p>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Total Posts" value={stats.totalPosts} icon={FileText} />
          <StatCard title="Total Services" value={stats.totalServices} icon={Briefcase} />
          <StatCard title="Total Views" value={stats.views} icon={Eye} />
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

          {/* BLOG MANAGER */}
          <div
            onClick={() => handleNavigate("/admin/blog")}
            className="cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <BookOpen size={40} className="text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Blog Manager</h2>
            <p className="text-slate-600 mb-4">
              Create, edit and manage blog posts.
            </p>
            <span className="text-purple-600 font-semibold flex items-center gap-2">
              Manage Blogs <ArrowRight size={16} />
            </span>
          </div>

          {/* SERVICES MANAGER */}
          <div
            onClick={() => handleNavigate("/admin/services")}
            className="cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition hover:border-purple-400 border-2 border-transparent"
          >
            <Briefcase size={40} className="text-green-600 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Services Manager</h2>
            <p className="text-slate-600 mb-4">
              Create, edit and manage your services.
            </p>
            <span className="text-green-600 font-semibold flex items-center gap-2">
              Manage Services <ArrowRight size={16} />
            </span>
          </div>

          {/* ANALYTICS */}
          <DisabledCard
            title="Analytics"
            description="View traffic & engagement"
            icon={BarChart3}
          />
        </div>

        {/* RECENT POSTS */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>

          {recentPosts.length === 0 ? (
            <p className="text-slate-600">No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 hover:bg-purple-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-purple-600 font-semibold">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-6 border-t text-center text-sm text-slate-600">
          <p>UpCurve Media Admin Panel • v1.0</p>

          <button
            onClick={handleLogout}
            className="mt-4 text-purple-600 font-semibold hover:text-purple-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow border">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <Icon size={32} className="text-purple-600" />
    </div>
  </div>
);

const DisabledCard = ({ title, description, icon: Icon }) => (
  <div className="bg-white p-8 rounded-xl shadow opacity-50">
    <Icon size={40} className="mb-4 text-slate-500" />
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-slate-600 mb-4">{description}</p>
    <span className="text-slate-400 font-semibold">Coming Soon</span>
  </div>
);

export default Admin;