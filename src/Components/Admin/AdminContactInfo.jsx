import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Save,
  X,
  Loader,
  Home,
  BookOpen,
  Briefcase,
  MessageSquare,
  LogOut,
  ChevronRight,
  Menu,
  Globe,
  Building,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { signOut } from "../../services/auth";

export default function AdminContactInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [contactInfo, setContactInfo] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalServices: 0,
    totalContacts: 0,
    newContacts: 0,
  });

  const [form, setForm] = useState({
    type: "phone",
    value: "",
    description: "",
    icon: "Phone",
  });

  const iconOptions = [
    { value: "Phone", label: "Phone", icon: Phone },
    { value: "Mail", label: "Email", icon: Mail },
    { value: "MapPin", label: "Location", icon: MapPin },
    { value: "Globe", label: "Website", icon: Globe },
    { value: "Building", label: "Office", icon: Building },
  ];

  useEffect(() => {
    fetchContactInfo();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: posts } = await supabase.from("posts").select("id");
    const { data: services } = await supabase.from("services").select("id");
    const { data: contacts } = await supabase.from("contacts").select("id, status");

    const newContactsCount = contacts?.filter(c => c.status === 'new').length || 0;
    
    setStats({
      totalPosts: posts?.length || 0,
      totalServices: services?.length || 0,
      totalContacts: contacts?.length || 0,
      newContacts: newContactsCount,
    });
  };

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .order("type", { ascending: true });

      if (error) {
        console.error("Fetch error:", error);
        setMessage("❌ Error loading contact info");
        return;
      }

      setContactInfo(data || []);
      console.log("✅ Contact info loaded:", data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("❌ Error loading contact info");
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("admin_session");
      localStorage.removeItem("customer_session");
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.scrollTo(0, 0);
      navigate("/user-auth", { replace: true, state: { isAdmin: true } });
    }
  };

  const handleMenuItemClick = (path) => {
    window.scrollTo(0, 0);
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
      icon: Phone,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (info) => {
    setForm({
      type: info.type,
      value: info.value,
      description: info.description,
      icon: info.icon || "Phone",
    });
    setEditingId(info.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.value || !form.description) {
      setMessage("❌ All fields are required!");
      return;
    }

    try {
      setSubmitting(true);

      const submitData = {
        type: form.type,
        value: form.value,
        description: form.description,
        icon: form.icon,
      };

      if (editingId) {
        const { error } = await supabase
          .from("contact_info")
          .update(submitData)
          .eq("id", editingId);

        if (error) throw error;
        setMessage("✅ Contact info updated successfully!");
      } else {
        const { error } = await supabase
          .from("contact_info")
          .insert([submitData]);

        if (error) throw error;
        setMessage("✅ Contact info added successfully!");
      }

      resetForm();
      setTimeout(fetchContactInfo, 500);
    } catch (error) {
      console.error("Error:", error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      type: "phone",
      value: "",
      description: "",
      icon: "Phone",
    });
    setEditingId(null);
    setTimeout(() => setMessage(""), 3000);
  };

  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(i => i.value === iconName);
    return icon ? icon.icon : Phone;
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'phone': return 'from-purple-600 to-purple-700';
      case 'email': return 'from-cyan-500 to-cyan-600';
      case 'location': return 'from-pink-500 to-pink-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="flex">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-72 bg-white shadow-2xl min-h-screen fixed left-0 top-0 bottom-0 z-40">
          <div className="flex flex-col h-full w-full">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
              <h2 className="text-2xl font-bold text-white">UpCurve</h2>
              <p className="text-purple-100 text-sm">Admin Panel</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? `${item.bgColor} ${item.color} font-semibold shadow-md`
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive(item.path) ? item.bgColor : "bg-slate-100"}`}>
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

        {/* MOBILE SIDEBAR */}
        <aside
          className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">UpCurve</h2>
                  <p className="text-purple-100 text-sm">Admin Panel</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white">
                  <X size={24} />
                </button>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive(item.path)
                      ? `${item.bgColor} ${item.color} font-semibold shadow-md`
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive(item.path) ? item.bgColor : "bg-slate-100"}`}>
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

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 min-h-screen lg:ml-72 w-full">
          {/* HEADER */}
          <header className="bg-white shadow-sm border-b sticky top-0 z-30">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <Menu size={24} />
                </button>
                <div>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
                    Contact Information
                  </h1>
                  <p className="text-xs md:text-sm text-slate-600">
                    Manage phone, email, and location details
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="p-4 sm:p-6 lg:p-8">
            {/* Message Alert */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-xl font-semibold ${
                  message.includes("✅")
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* Form Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 border-2 border-cyan-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {editingId ? "Edit Contact Info" : "Add New Contact Info"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-200 rounded-lg focus:border-cyan-600 outline-none transition"
                      required
                    >
                      <option value="phone">Phone</option>
                      <option value="email">Email</option>
                      <option value="location">Location</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Icon */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Icon *
                    </label>
                    <select
                      name="icon"
                      value={form.icon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-200 rounded-lg focus:border-cyan-600 outline-none transition"
                      required
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-slate-600">Icon:</span>
                      <div className="p-2 bg-cyan-50 rounded-lg">
                        {(() => {
                          const IconComponent = getIconComponent(form.icon);
                          return <IconComponent size={20} className="text-cyan-600" />;
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Value (Phone/Email/Address) *
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={form.value}
                      onChange={handleInputChange}
                      placeholder="+91 79916 47990 or info@example.com"
                      className="w-full px-4 py-3 border-2 border-cyan-200 rounded-lg focus:border-cyan-600 outline-none transition"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="Call us anytime, we're always ready to help"
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-cyan-200 rounded-lg focus:border-cyan-600 outline-none transition resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingId ? "Update Info" : "Add Info"}
                      </>
                    )}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Contact Info List */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-cyan-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Current Contact Information ({contactInfo.length})
              </h2>

              {contactInfo.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">No contact info added yet</p>
                  <p className="text-sm text-slate-500">Add your first contact information above</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactInfo.map((info) => {
                    const IconComponent = getIconComponent(info.icon);
                    return (
                      <div
                        key={info.id}
                        className="bg-gradient-to-br from-white to-cyan-50 rounded-xl p-6 border border-cyan-200 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorForType(info.type)}`}>
                            <IconComponent size={24} className="text-white" />
                          </div>
                          <button
                            onClick={() => handleEdit(info)}
                            className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-all font-medium text-sm"
                          >
                            Edit
                          </button>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-2 capitalize">
                          {info.type}
                        </h3>
                        
                        <p className="text-slate-700 font-medium mb-2">
                          {info.type === 'email' ? (
                            <a href={`mailto:${info.value}`} className="hover:text-cyan-600 transition">
                              {info.value}
                            </a>
                          ) : info.type === 'phone' ? (
                            <a href={`tel:${info.value}`} className="hover:text-cyan-600 transition">
                              {info.value}
                            </a>
                          ) : (
                            info.value
                          )}
                        </p>
                        
                        <p className="text-slate-600 text-sm">
                          {info.description}
                        </p>
                        
                        <div className="mt-4 pt-4 border-t border-cyan-100">
                          <p className="text-xs text-slate-500">
                            Last updated: {new Date(info.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}