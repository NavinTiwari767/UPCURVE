import { useEffect, useState, useRef } from "react";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { supabase } from "../../services/supabase";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  // 🔥 IMPORTANT: Add this line (must match your AdminBlog component)
  const BUCKET_NAME = "blog-images"; // 👈 ADD THIS LINE

  // ✅ Common scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    fetchPosts();
    // Scroll to top when component mounts
    setTimeout(() => {
      scrollToTop();
    }, 100);
  }, []);

  useEffect(() => {
    const observers = [];
    
    observerRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [index]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [posts]);

  const addToRefs = (el, index) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current[index] = el;
    }
  };

  // 🔥 ADD THIS FUNCTION to convert image_path to URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(imagePath);
    
    return data.publicUrl;
  };

  // 🔥 UPDATE THIS FUNCTION to convert paths to URLs
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        return;
      }

      // 🔥 ADD THIS: Convert image paths to full URLs
      const postsWithImages = (data || []).map(post => {
        const image_url = post.image_path ? getImageUrl(post.image_path) : null;
        
        return {
          ...post,
          image_url: image_url, // 👈 This adds the image_url field
        };
      });

      setPosts(postsWithImages);
    } catch (err) {
      console.error("Fetch error:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBlogs = () => {
    scrollToTop(); // Scroll to top first
    setTimeout(() => {
      setSelectedPost(null); // Then clear selected post
    }, 300);
  };

  const handlePostClick = (post) => {
    scrollToTop(); // Scroll to top first
    setTimeout(() => {
      setSelectedPost(post); // Then set selected post
    }, 300);
  };

  // 🔹 Single blog view
  if (selectedPost) {
    // 🔥 UPDATE THIS: Ensure selectedPost has image_url
    const displayPost = {
      ...selectedPost,
      image_url: selectedPost.image_path ? getImageUrl(selectedPost.image_path) : null
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
          <button
            onClick={handleBackToBlogs}
            className="group flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-semibold transition-all duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Blogs
          </button>

          {/* Featured Image */}
          {displayPost.image_url && (
            <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl border border-purple-200 animate-fade-in">
              <img
                src={displayPost.image_url}
                alt={displayPost.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", displayPost.image_url);
                  e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 animate-slide-up">
            {displayPost.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-slate-600 mb-8 pb-8 border-b border-purple-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="font-medium">{displayPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <Calendar size={16} className="text-white" />
              </div>
              <span>{new Date(displayPost.created_at).toDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center">
                <Clock size={16} className="text-white" />
              </div>
              <span>{Math.ceil(displayPost.content.split(' ').length / 200)} min read</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {displayPost.content}
            </p>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-purple-200">
            <p className="text-sm font-semibold text-purple-600 mb-4">SHARE THIS POST</p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Blog list
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[550px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/50"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Our Blog
          </h1>
          <p className="text-xl text-gray-200 animate-slide-up">
            Latest insights, tips, and stories from our team
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={el => addToRefs(el, 0)}
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <p className="text-sm font-semibold text-purple-600 tracking-widest mb-4">⚡ OUR BLOG</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Latest Articles
            </h2>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Loading posts...</p>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-600">No blog posts yet. Check back soon!</p>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <div 
                key={post.id}
                ref={el => addToRefs(el, idx + 1)}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  isVisible[idx + 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: isVisible[idx + 1] ? `${idx * 100}ms` : '0ms' }}
                onClick={() => handlePostClick(post)}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                  {post.image_url ? ( 
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        console.error("Image failed to load:", post.image_url);
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                            <span class="text-6xl mb-2">📝</span>
                            <p class="text-sm text-slate-600">Image not available</p>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                      <span className="text-6xl mb-2">📝</span>
                      <p className="text-sm text-slate-600">No image</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-4 py-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-semibold rounded-full">
                    Article
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {post.excerpt || post.content.slice(0, 120) + "..."}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Read More</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out 0.3s backwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}