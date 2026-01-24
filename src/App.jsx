import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

// Home sections
import Intro from "./Components/Intro";
import HomeService from "./Components/HomeService";
import Explore from "./Components/Explore";
import Scroll from "./Components/Scroll";
import Contact from "./Components/Contact";

// Pages
import About from "./Components/Pages/About";
import Services from "./Components/Pages/Services";
import Blog from "./Components/Pages/Blog";
import Cart from "./Components/Pages/Cart";
import Custom from "./Components/Pages/Custom";
import Business from "./Components/Pages/Business";
import Ecommerce from "./Components/Pages/Ecommerce";
import Logo from "./Components/Pages/Logo";
import Policy from "./Components/Pages/Policy";

// Admin
import Admin from "./Components/Admin/Admin";
import AdminBlog from "./Components/Admin/AdminBlog";
import AdminServices from "./Components/Admin/AdminServices";
import ProtectedRoute from "./Components/Admin/ProtectedRoute";

// Auth (ONLY LOGIN)
import Login from "./Components/Auth/Login";

// Cart Provider
import { CartProvider } from "./context/CartContext";

const Home = () => (
  <>
    <Intro />
    <HomeService />
    <Explore />
    <Scroll />
  </>
);

function Layout() {
  const location = useLocation();

  // ❌ Nav & Footer hide ONLY on admin + login
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
      {!hideLayout && <Nav />}

      <Routes>
        {/* 🌍 Public */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/business" element={<Business />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/logo" element={<Logo />} />
        <Route path="/policy" element={<Policy />} />

        {/* 🔐 Login only */}
        <Route path="/login" element={<Login />} />

        {/* 🛡️ Protected Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <AdminBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}