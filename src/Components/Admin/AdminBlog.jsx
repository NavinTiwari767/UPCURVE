import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Trash2, Edit, Save, X, ImageIcon, ArrowLeft, Eye, Calendar, User, Clock } from "lucide-react";

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 font-semibold transition-all duration-300"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                Blog Manager
              </h1>
              <p className="text-lg text-slate-600">
                Create, edit and manage your blog posts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white rounded-full shadow border border-purple-100">
                <span className="font-semibold text-slate-900">{posts.length}</span>
                <span className="text-slate-600 ml-2">Posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl font-semibold ${
            message.includes("✅") ? "bg-green-50 border border-green-200 text-green-700" :
            message.includes("❌") ? "bg-red-50 border border-red-200 text-red-700" :
            "bg-blue-50 border border-blue-200 text-blue-700"
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 sticky top-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingId ? "Edit Post" : "Create New Post"}
                </h2>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="text-slate-500 hover:text-slate-700 font-medium"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              {/* Image Upload */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Featured Image
                </label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden border-2 border-purple-200 mb-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition shadow-lg"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center mb-4 hover:border-purple-400 transition cursor-pointer bg-purple-50/50">
                      <ImageIcon size={48} className="mx-auto text-purple-400 mb-3" />
                      <p className="text-sm text-slate-600 font-medium">
                        Click to upload image
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
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
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
                    placeholder="Enter post title..."
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition"
                    placeholder="Author name..."
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition resize-none"
                    placeholder="Short description (appears in blog list)..."
                    rows="3"
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    className="w-full p-3 bg-white text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition resize-none"
                    placeholder="Write your post content..."
                    rows="8"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8">
                <button
                  onClick={handleSubmit}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>
            </div>
          </div>

          {/* POSTS LIST - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  All Posts ({posts.length})
                </h2>
                <div className="flex items-center gap-2 text-slate-600">
                  <Eye size={18} />
                  <span className="text-sm">Preview on site</span>
                </div>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ImageIcon size={32} className="text-purple-400" />
                  </div>
                  <p className="text-slate-600 mb-2">No posts yet</p>
                  <p className="text-sm text-slate-500">Create your first blog post to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex gap-6">
                        {/* Thumbnail */}
                        {post.image_url && (
                          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.parentElement.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
                                    <span class="text-3xl text-slate-400">📝</span>
                                  </div>
                                `;
                              }}
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                                {post.excerpt || post.content.slice(0, 120) + "..."}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => handleEdit(post)}
                                className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-purple-100 hover:text-purple-700 transition"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                            </div>
                            {post.image_path && (
                              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                Has Image
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}