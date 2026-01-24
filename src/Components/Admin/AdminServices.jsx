import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Loader,
  ArrowLeft,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function AdminServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
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
  }, []);

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
        // Update
        const { error } = await supabase
          .from("services")
          .update(submitData)
          .eq("id", editingId);

        if (error) throw error;
        setMessage("✅ Service updated successfully!");
      } else {
        // Insert
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
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6 transition"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Services Manager
              </h1>
              <p className="text-slate-600">Add, edit, or delete services</p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                Add Service
              </button>
            )}
          </div>
        </div>

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
        {showForm && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? "Edit Service" : "Add New Service"}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-2"
                >
                  <X size={20} />
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Number (01, 02, 03...) *
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={form.number}
                    onChange={handleInputChange}
                    placeholder="01"
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    placeholder="e.g., CUSTOMIZATION"
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                    required
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="e.g., WordPress & Marketing"
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                    required
                  />
                </div>

                {/* Price - NEW */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign size={16} />
                    Price (₹) *
                  </label>
                  <div className="flex items-center border-2 border-purple-200 rounded-lg overflow-hidden">
                    <span className="px-3 py-2 bg-purple-100 text-purple-700 font-semibold">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleInputChange}
                      placeholder="5999"
                      min="1"
                      className="flex-1 px-4 py-2 outline-none focus:bg-purple-50 transition"
                      required
                    />
                  </div>
                </div>

                {/* Color */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Color *
                  </label>
                  <select
                    name="color"
                    value={form.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  {/* Color Preview */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-slate-600">Preview:</span>
                    <div
                      className={`w-20 h-8 rounded bg-gradient-to-r ${form.color} shadow`}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Service description..."
                  rows="4"
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none transition resize-none"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {editingId ? "Update Service" : "Add Service"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            All Services ({services.length})
          </h2>

          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No services added yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold"
              >
                Add First Service
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-l-4 border-purple-600 hover:shadow-lg transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
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

                    {/* Price Display - NEW */}
                    <div>
                      <p className="text-sm text-slate-600">Price</p>
                      <p className="text-xl font-bold text-green-600">
                        ₹{service.price || "5999"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Description Preview */}
                  <p className="text-slate-600 mt-4 text-sm">
                    {service.description.substring(0, 100)}...
                  </p>

                  {/* Color Preview */}
                  <div className="mt-3 flex items-center gap-2">
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
      </div>
    </div>
  );
}