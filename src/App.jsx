import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

// Pages
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Services from "./Components/Pages/Services";
import Blog from "./Components/Pages/Blog";
import Cart from "./Components/Pages/Cart";
import Checkout from "./Components/Pages/Checkout";
import Order from "./Components/Pages/Order";
import Custom from "./Components/Pages/Custom";
import Business from "./Components/Pages/Business";
import Ecommerce from "./Components/Pages/Ecommerce";
import Logo from "./Components/Pages/Logo";
import Policy from "./Components/Pages/Policy";
import Contact from "./Components/Contact"; // Public contact page

// Admin
import Admin from "./Components/Admin/Admin";
import AdminBlog from "./Components/Admin/AdminBlog";
import AdminServices from "./Components/Admin/AdminServices";
import AdminContacts from "./Components/Admin/AdminContacts";
import AdminContactInfo from "./Components/Admin/AdminContactInfo";

// Auth
import UserAuth from "./Components/Auth/UserAuth"; // Customer only
import Login from "./Components/Auth/Login"; // Admin only

// Protected Routes
import ProtectedRoute from "./Components/Admin/ProtectedRoute";
import AdminProtectedRoute from "./Components/Admin/AdminProtectedRoute";

// Cart Provider
import { CartProvider } from "./context/CartContext";

// ✅ Check if user is on admin route
const isAdminRoute = (pathname) => {
  return pathname.startsWith('/admin') || pathname === '/login';
};

function Layout() {
  const location = useLocation();

  // Hide Nav & Footer on admin routes
  const hideLayout = isAdminRoute(location.pathname) || 
                     location.pathname === '/user-auth';

  return (
    <>
      {!hideLayout && <Nav />}

      <Routes>
        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} /> {/* ✅ Public contact form */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/custom" element={<Custom />} /> 
        <Route path="/business" element={<Business />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/logo" element={<Logo />} />
        <Route path="/policy" element={<Policy />} />


        {/* 🔐 AUTH ROUTES */}
        <Route path="/user-auth" element={<UserAuth />} /> {/* Customer */}
        <Route path="/login" element={<Login />} /> {/* Admin */}

        {/* 🛒 CUSTOMER PROTECTED ROUTES */}
        <Route path="/cart" element={
          <ProtectedRoute type="customer">
            <Cart />
          </ProtectedRoute>
        } />

        <Route path="/checkout" element={
          <ProtectedRoute type="customer">
            <Checkout />
          </ProtectedRoute>
        } />

        <Route path="/order" element={
          <ProtectedRoute type="customer">
            <Order />
          </ProtectedRoute>
        } />

        {/* 👑 ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/blog"
          element={
            <AdminProtectedRoute>
              <AdminBlog />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <AdminProtectedRoute>
              <AdminServices />
            </AdminProtectedRoute>
          }
        />

        {/* ✅ ADMIN CONTACTS ROUTE - FIXED! */}
        <Route
          path="/admin/contacts"
          element={
            <AdminProtectedRoute>
              <AdminContacts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/contact-info"
          element={
            <AdminProtectedRoute>
              <AdminContactInfo />
            </AdminProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Home />} />
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