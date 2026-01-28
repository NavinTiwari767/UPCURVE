import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader,
  DollarSign,
  Home,
  BookOpen,
  Briefcase,
  MessageSquare,
  LogOut,
  ChevronRight,
  Menu,
  Phone, // Added Phone icon
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { signOut } from "../../services/auth";

export default function AdminServices() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalServices: 0,
    totalContacts: 0,
    newContacts: 0,
  });
  const [form, setForm] = useState({
    number: "",
    category: "",
    title: "",
    description: "",
    color: "from-purple-400 to-purple-600",
    price: 5999,
  });

  const colorOptions = [
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-orange-400 to-orange-600",
    "from-red-400 to-red-600",
    "from-cyan-400 to-cyan-600",
    "from-indigo-400 to-indigo-600",
  ];

  useEffect(() => {
    fetchServices();
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
      icon: Phone, // Added Phone icon
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

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Fetch error:", error);
        setMessage("❌ Error loading services");
        return;
      }

      setServices(data || []);
      setStats(prev => ({ ...prev, totalServices: (data || []).length }));
      console.log("✅ Services loaded:", data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("❌ Error loading services");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.number || !form.category || !form.title || !form.description) {
      setMessage("❌ All fields are required!");
      return;
    }

    if (form.price <= 0) {
      setMessage("❌ Price must be greater than 0!");
      return;
    }

    try {
      setSubmitting(true);

      const submitData = {
        number: form.number,
        category: form.category,
        title: form.title,
        description: form.description,
        color: form.color,
        price: form.price,
      };

      if (editingId) {
        const { error } = await supabase
          .from("services")
          .update(submitData)
          .eq("id", editingId);

        if (error) throw error;
        setMessage("✅ Service updated successfully!");
      } else {
        const { error } = await supabase
          .from("services")
          .insert([submitData]);

        if (error) throw error;
        setMessage("✅ Service added successfully!");
      }

      resetForm();
      setTimeout(fetchServices, 500);
    } catch (error) {
      console.error("Error:", error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      number: "",
      category: "",
      title: "",
      description: "",
      color: "from-purple-400 to-purple-600",
      price: 5999,
    });
    setEditingId(null);
    setShowForm(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (service) => {
    setForm({
      number: service.number,
      category: service.category,
      title: service.title,
      description: service.description,
      color: service.color,
      price: service.price || 5999,
    });
    setEditingId(service.id);
    setShowForm(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;
      setMessage("✅ Service deleted successfully!");
      fetchServices();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="flex">
        {/* ✅ DESKTOP SIDEBAR */}
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

        {/* ✅ MOBILE SIDEBAR */}
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

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}

        {/* ✅ MAIN CONTENT */}
        <div className="flex-1 min-h-screen lg:ml-72 w-full">
          {/* HEADER */}
          <header className="bg-white shadow-sm border-b sticky top-0 z-30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex-shrink-0"
                >
                  <Menu size={20} />
                </button>
                <div className="flex-1 sm:flex-none">
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-900">
                    Services Manager
                  </h1>
                  <p className="text-xs md:text-sm text-slate-600">
                    Add, edit, or delete services
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-xl shadow-sm border border-green-100 flex-1 sm:flex-none">
                  <span className="text-lg sm:text-xl font-bold text-green-600">
                    {services.length}
                  </span>
                  <span className="text-gray-600 text-xs sm:text-sm">Services</span>
                </div>
                
                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base flex-shrink-0"
                  >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Message Alert */}
            {message && (
              <div
                className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl font-semibold text-sm sm:text-base ${
                  message.includes("✅")
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            {/* Form Section */}
            {showForm && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8 border-2 border-purple-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {editingId ? "Edit Service" : "Add New Service"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-2 text-sm sm:text-base"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Number */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                        Number (01, 02, 03...) *
                      </label>
                      <input
                        type="text"
                        name="number"
                        value={form.number}
                        onChange={handleInputChange}
                        placeholder="01"
                        className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                        Category *
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        placeholder="e.g., CUSTOMIZATION"
                        className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                        required
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                        placeholder="e.g., WordPress & Marketing"
                        className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                        required
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <DollarSign size={14} />
                        Price (₹) *
                      </label>
                      <div className="flex items-center border-2 border-purple-200 rounded-lg overflow-hidden">
                        <span className="px-2 sm:px-3 py-2 bg-purple-100 text-purple-700 font-semibold text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          name="price"
                          value={form.price}
                          onChange={handleInputChange}
                          placeholder="5999"
                          min="1"
                          className="flex-1 px-3 sm:px-4 py-2 text-sm outline-none focus:bg-purple-50 transition"
                          required
                        />
                      </div>
                    </div>

                    {/* Color */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                        Color *
                      </label>
                      <select
                        name="color"
                        value={form.color}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                      >
                        {colorOptions.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-slate-600">Preview:</span>
                        <div
                          className={`w-16 sm:w-20 h-6 sm:h-8 rounded bg-gradient-to-r ${form.color} shadow`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="Service description..."
                      rows="4"
                      className="w-full px-3 sm:px-4 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition resize-none"
                      required
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      {submitting ? (
                        <>
                          <Loader size={16} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          {editingId ? "Update Service" : "Add Service"}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Services List */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-purple-100">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-8">
                All Services ({services.length})
              </h2>

              {services.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-slate-600 mb-4 text-sm sm:text-base">No services added yet</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold text-sm sm:text-base"
                  >
                    Add First Service
                  </button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-l-4 border-purple-600 hover:shadow-lg transition-all"
                    >
                      {/* Mobile View */}
                      <div className="md:hidden space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-xs text-slate-600">Number</p>
                            <p className="text-2xl font-bold text-purple-600">
                              {service.number}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-600">Price</p>
                            <p className="text-lg font-bold text-green-600">
                              ₹{service.price || "5999"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-slate-600">Category</p>
                          <p className="font-semibold text-slate-900 text-sm">
                            {service.category}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-600">Title</p>
                          <p className="font-semibold text-slate-900 text-sm">
                            {service.title}
                          </p>
                        </div>

                        <p className="text-slate-600 text-xs line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs text-slate-500">Color:</span>
                          <div
                            className={`w-10 h-6 rounded bg-gradient-to-r ${service.color}`}
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-1 text-xs font-semibold"
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-1 text-xs font-semibold"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Desktop View */}
                      <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                        <div>
                          <p className="text-sm text-slate-600">Number</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {service.number}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-600">Category</p>
                          <p className="font-semibold text-slate-900">
                            {service.category}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-600">Title</p>
                          <p className="font-semibold text-slate-900">
                            {service.title}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-600">Price</p>
                          <p className="text-xl font-bold text-green-600">
                            ₹{service.price || "5999"}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-600 mt-3 md:mt-4 text-sm hidden md:block">
                        {service.description.substring(0, 100)}...
                      </p>

                      <div className="mt-3 md:mt-3 flex items-center gap-2 hidden md:flex">
                        <span className="text-xs text-slate-500">Color:</span>
                        <div
                          className={`w-12 h-6 rounded bg-gradient-to-r ${service.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}