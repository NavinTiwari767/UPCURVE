import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Trash2,
  Eye,
  Calendar,
  Filter,
  Search,
  X,
  CheckCircle,
  Clock,
  Archive,
  RefreshCw,
  Home, // Added
  BookOpen, // Added
  Briefcase, // Added
  LogOut, // Added
  Menu, // Added
  ChevronRight, // Added
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Added
import { signOut } from "../../services/auth"; // Added

const AdminContacts = () => {
  const navigate = useNavigate(); // Added
  const location = useLocation(); // Added
  
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Added
  const [stats, setStats] = useState({ // Added stats state
    totalPosts: 0,
    totalServices: 0,
    totalContacts: 0,
    newContacts: 0,
  });

  useEffect(() => {
    fetchContacts();
    fetchStats(); // Added
  }, []);

  const fetchStats = async () => { // Added function
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

  const handleLogout = async () => { // Added function
    try {
      localStorage.removeItem("admin_session");
      localStorage.removeItem("customer_session");
      await signOut();
      console.log("✅ Admin logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.scrollTo(0, 0);
      navigate("/user-auth", { replace: true, state: { isAdmin: true } });
    }
  };

  const handleMenuItemClick = (path) => { // Added function
    window.scrollTo(0, 0);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
    navigate(path);
  };

  const menuItems = [ // Added menu items
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

  const isActive = (path) => { // Added function
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      console.log("✅ Contacts fetched:", data);
      setContacts(data || []);
      // Update stats
      setStats(prev => ({ ...prev, totalContacts: (data || []).length }));
    } catch (err) {
      console.error("❌ Error fetching contacts:", err);
      alert("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      console.log(`✅ Contact ${id} status updated to ${newStatus}`);
      fetchContacts();
      fetchStats(); // Update stats after status change
    } catch (err) {
      console.error("❌ Error updating contact status:", err);
      alert("Failed to update status");
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);

      if (error) throw error;

      console.log(`✅ Contact ${id} deleted`);
      fetchContacts();
      fetchStats(); // Update stats after delete
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error deleting contact:", err);
      alert("Failed to delete contact");
    }
  };

  const openContactModal = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    // Mark as read when opened
    if (contact.status === "new") {
      updateContactStatus(contact.id, "read");
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      new: "bg-blue-100 text-blue-700 border-blue-200",
      read: "bg-yellow-100 text-yellow-700 border-yellow-200",
      replied: "bg-green-100 text-green-700 border-green-200",
      archived: "bg-gray-100 text-gray-700 border-gray-200",
    };

    const statusIcons = {
      new: Clock,
      read: Eye,
      replied: CheckCircle,
      archived: Archive,
    };

    const Icon = statusIcons[status];

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status]}`}
      >
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const contactStats = {
    total: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    read: contacts.filter((c) => c.status === "read").length,
    replied: contacts.filter((c) => c.status === "replied").length,
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
                    Contact Manager
                  </h1>
                  <p className="text-xs md:text-sm text-slate-600">
                    Manage and respond to contact form submissions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-orange-100">
                  <span className="text-xl sm:text-2xl font-bold text-orange-600">
                    {contacts.length}
                  </span>
                  <span className="text-gray-600 text-sm">Contacts</span>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="p-4 sm:p-6 lg:p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Contacts"
                value={contactStats.total}
                icon={MessageSquare}
                color="purple"
              />
              <StatCard title="New" value={contactStats.new} icon={Clock} color="blue" />
              <StatCard
                title="Read"
                value={contactStats.read}
                icon={Eye}
                color="yellow"
              />
              <StatCard
                title="Replied"
                value={contactStats.replied}
                icon={CheckCircle}
                color="green"
              />
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="text-slate-600" size={20} />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={fetchContacts}
                  className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  <span className="hidden md:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Contacts List */}
            {loading ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading contacts...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center">
                <MessageSquare className="mx-auto mb-4 text-slate-400" size={48} />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No contacts found
                </h3>
                <p className="text-slate-600">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Contact form submissions will appear here"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition cursor-pointer"
                    onClick={() => openContactModal(contact)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <User className="text-purple-600" size={20} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">
                              {contact.first_name}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {contact.service_type}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail size={16} />
                            <a
                              href={`mailto:${contact.email}`}
                              className="hover:text-purple-600"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {contact.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone size={16} />
                            <a
                              href={`tel:${contact.phone}`}
                              className="hover:text-purple-600"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {contact.phone}
                            </a>
                          </div>
                        </div>

                        <p className="text-slate-700 line-clamp-2 mb-3">
                          {contact.message}
                        </p>

                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <Calendar size={14} />
                          {formatDate(contact.created_at)}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        {getStatusBadge(contact.status)}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteContact(contact.id);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Contact Details
                  </h2>
                  {getStatusBadge(selectedContact.status)}
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-600 uppercase mb-2 block">
                    Name
                  </label>
                  <p className="text-lg text-slate-900">
                    {selectedContact.first_name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 uppercase mb-2 block">
                    Email
                  </label>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-lg text-purple-600 hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 uppercase mb-2 block">
                    Phone
                  </label>
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="text-lg text-purple-600 hover:underline"
                  >
                    {selectedContact.phone}
                  </a>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 uppercase mb-2 block">
                    Service Type
                  </label>
                  <p className="text-lg text-slate-900">
                    {selectedContact.service_type}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 uppercase mb-2 block">
                    Message
                  </label>
                  <p className="text-slate-900 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl">
                    {selectedContact.message}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-600 uppercase mb-2 block">
                    Submitted On
                  </label>
                  <p className="text-slate-900">
                    {formatDate(selectedContact.created_at)}
                  </p>
                </div>

                {/* Status Actions */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 uppercase mb-3 block">
                    Update Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        updateContactStatus(selectedContact.id, "read")
                      }
                      className="px-4 py-3 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      Mark as Read
                    </button>
                    <button
                      onClick={() =>
                        updateContactStatus(selectedContact.id, "replied")
                      }
                      className="px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Mark as Replied
                    </button>
                    <button
                      onClick={() =>
                        updateContactStatus(selectedContact.id, "archived")
                      }
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <Archive size={18} />
                      Archive
                    </button>
                    <button
                      onClick={() => deleteContact(selectedContact.id)}
                      className="px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition font-semibold flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-200",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon size={24} className={colors.text} />
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
};

export default AdminContacts;