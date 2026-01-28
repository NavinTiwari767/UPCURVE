import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Trash2, Edit, Save, X, ImageIcon, ArrowLeft, Calendar, User, Clock, Plus, Search } from "lucide-react";

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "Admin",
  });

  const BUCKET_NAME = "blog-images";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
        setMessage("Error loading posts");
        return;
      }

      const postsWithImages = (data || []).map(post => ({
        ...post,
        image_url: post.image_path 
          ? supabase.storage.from(BUCKET_NAME).getPublicUrl(post.image_path).data.publicUrl
          : null
      }));

      setPosts(postsWithImages);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Error loading posts");
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Image size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        setMessage("Please select an image file");
        return;
      }

      setImageFile(file);
      setMessage("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type
        });

      if (error) throw error;
      return fileName;
      
    } catch (error) {
      console.error("❌ Upload error:", error);
      setMessage(`❌ Upload failed: ${error.message}`);
      return null;
    }
  };

  const deleteImage = async (imagePath) => {
    if (!imagePath) return;
    try {
      await supabase.storage.from(BUCKET_NAME).remove([imagePath]);
    } catch (error) {
      console.error("Delete image error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setMessage("Title is required!");
      return;
    }

    if (!form.content.trim()) {
      setMessage("Content is required!");
      return;
    }

    setUploading(true);
    let image_path = null;

    try {
      if (imageFile) {
        image_path = await uploadImage();
        if (!image_path) {
          setUploading(false);
          return;
        }

        if (editingId) {
          const existingPost = posts.find((p) => p.id === editingId);
          if (existingPost?.image_path) {
            await deleteImage(existingPost.image_path);
          }
        }
      } else if (editingId) {
        const existingPost = posts.find((p) => p.id === editingId);
        image_path = existingPost?.image_path;
      }

      const postData = {
        title: form.title.trim(),
        content: form.content.trim(),
        excerpt: form.excerpt.trim(),
        author: form.author.trim(),
        image_path: image_path,
      };

      if (editingId) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingId);

        if (error) throw error;
        setMessage("✅ Post updated successfully!");
      } else {
        const { error } = await supabase.from("blog_posts").insert([postData]);
        if (error) throw error;
        setMessage("✅ Post published successfully!");
      }

      resetForm();
      setTimeout(fetchPosts, 500);
    } catch (error) {
      console.error("Error:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", content: "", excerpt: "", author: "Admin" });
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setShowForm(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
    });
    setEditingId(post.id);
    setImagePreview(post.image_url || null);
    setImageFile(null);
    setMessage("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const postToDelete = posts.find(p => p.id === id);
      
      if (postToDelete?.image_path) {
        await deleteImage(postToDelete.image_path);
      }

      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;

      setMessage("✅ Post deleted successfully!");
      fetchPosts();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 mb-6 font-medium transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2">
                <span className="text-purple-700">Blog</span>{" "}
                <span className="text-pink-600">Studio</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Create and manage your content
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-purple-100">
                <span className="text-xl sm:text-2xl font-bold text-purple-600">
                  {posts.length}
                </span>
                <span className="text-gray-600 text-sm">Posts</span>
              </div>
              
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25"
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">New Post</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl font-medium shadow-sm ${
            message.includes("✅") 
              ? "bg-green-50 border border-green-200 text-green-700" 
              : message.includes("❌") 
              ? "bg-red-50 border border-red-200 text-red-700" 
              : "bg-purple-50 border border-purple-200 text-purple-700"
          }`}>
            {message}
          </div>
        )}

        {/* Create/Edit Form */}
        {showForm && (
          <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {editingId ? "Edit Post" : "Create New Post"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Featured Image
                  </label>
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border-2 border-purple-200 group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 sm:h-64 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white rounded-lg transition-colors shadow-lg"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center hover:border-purple-400 transition-all cursor-pointer bg-purple-50/30">
                        <ImageIcon size={48} className="text-purple-400 mb-3" />
                        <p className="text-sm font-medium text-gray-700 text-center">
                          Tap to upload image
                        </p>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          Max 5MB • PNG, JPG, WebP
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageSelect}
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      placeholder="Enter post title..."
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
                      placeholder="Author name..."
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all resize-none"
                      placeholder="Brief description..."
                      rows="3"
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-white text-gray-900 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all resize-none"
                      placeholder="Write your post content..."
                      rows="8"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={uploading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
                  >
                    {uploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {imageFile ? "Uploading..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingId ? "Update Post" : "Publish Post"}
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6 border border-purple-100">
              <ImageIcon size={40} className="text-purple-400" />
            </div>
            <p className="text-gray-700 text-lg mb-2 font-medium">
              {searchTerm ? "No posts found" : "No posts yet"}
            </p>
            <p className="text-gray-500 text-sm text-center mb-6 px-4">
              {searchTerm ? "Try a different search term" : "Create your first blog post to get started"}
            </p>
            {!searchTerm && !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Plus size={20} />
                Create First Post
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                            <span class="text-5xl">📝</span>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={48} className="text-purple-300" />
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 bg-white hover:bg-purple-50 rounded-lg transition-colors shadow-lg"
                      title="Edit"
                    >
                      <Edit size={16} className="text-purple-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-white hover:bg-red-50 rounded-lg transition-colors shadow-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt || post.content.slice(0, 100) + "..."}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{Math.ceil(post.content.split(' ').length / 200)} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}