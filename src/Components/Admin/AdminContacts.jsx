import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseC";
// import { supabase } from '../services/supabase';
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
} from "lucide-react";


const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const stats = {
    total: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    read: contacts.filter((c) => c.status === "read").length,
    replied: contacts.filter((c) => c.status === "replied").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Contact Manager
          </h1>
          <p className="text-slate-600">
            Manage and respond to contact form submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Contacts"
            value={stats.total}
            icon={MessageSquare}
            color="purple"
          />
          <StatCard title="New" value={stats.new} icon={Clock} color="blue" />
          <StatCard
            title="Read"
            value={stats.read}
            icon={Eye}
            color="yellow"
          />
          <StatCard
            title="Replied"
            value={stats.replied}
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