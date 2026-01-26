import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check customer session from localStorage
  useEffect(() => {
    checkCustomerSession();
    
    // Listen for storage changes
    window.addEventListener('storage', checkCustomerSession);
    
    return () => {
      window.removeEventListener('storage', checkCustomerSession);
    };
  }, []);

  // ✅ Check customer session
  const checkCustomerSession = async () => {
    try {
      console.log('🔄 Checking customer session...');
      const sessionData = localStorage.getItem('customer_session');
      
      if (sessionData) {
        const customer = JSON.parse(sessionData);
        console.log('✅ User found:', customer.email);
        setUser(customer);
        
        // Load cart from database
        await loadCartFromDatabase(customer.id);
      } else {
        console.log('👤 No user session found');
        setUser(null);
        loadCartFromLocalStorage();
      }
    } catch (error) {
      console.error('❌ Error checking session:', error);
      setUser(null);
      loadCartFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load cart from database
  const loadCartFromDatabase = async (customerId) => {
    try {
      console.log(`📦 Loading cart for user: ${customerId}`);
      
      const { data, error } = await supabase
        .from('user_cart')
        .select('*')
        .eq('user_id', customerId);

      if (error) {
        console.error('❌ Error loading cart:', error);
        return;
      }

      if (data && data.length > 0) {
        const cartData = data.map(item => ({
          id: item.service_id,
          title: item.title,
          category: item.category || 'General',
          price: item.price,
          number: item.number || '00',
          quantity: item.quantity || 1,
          description: item.description || '',
          cart_id: item.id
        }));
        
        setCartItems(cartData);
        console.log('✅ Cart loaded:', cartData.length, 'items');
      } else {
        console.log('📦 Cart is empty');
        setCartItems([]);
      }
    } catch (err) {
      console.error('❌ Database error:', err);
    }
  };

  // ✅ Load cart from localStorage
  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        console.log('📦 Cart loaded from localStorage:', parsedCart.length, 'items');
      } else {
        console.log('📦 No cart in localStorage');
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ Error loading localStorage cart:', error);
      setCartItems([]);
    }
  };

  // ✅ Save to localStorage for guests
  useEffect(() => {
    if (!user && cartItems.length > 0) {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
      }
    }
  }, [cartItems, user]);

  // ✅ Add service to cart - SIMPLIFIED VERSION
  const addToCart = async (service) => {
    console.log('🛒 addToCart called');
    console.log('👤 User:', user?.email);
    console.log('📦 Service:', service);
    
    if (!service || !service.id) {
      console.error('❌ Invalid service:', service);
      return;
    }

    // If user is not logged in, use local cart
    if (!user) {
      console.log('📦 Using local cart (guest mode)');
      addToLocalCart(service);
      return;
    }

    try {
      console.log('✅ User logged in, saving to database...');
      
      // Prepare cart item data
      const cartItemData = {
        user_id: user.id,
        service_id: service.id,
        title: service.title || 'Untitled Service',
        category: service.category || 'General',
        price: Number(service.price) || 5999,
        number: service.number || '00',
        quantity: 1,
        description: service.description || ''
      };
      
      console.log('📝 Data to insert:', cartItemData);
      
      // First check if item already exists
      const { data: existingItem, error: checkError } = await supabase
        .from('user_cart')
        .select('*')
        .eq('user_id', user.id)
        .eq('service_id', service.id)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error checking existing item:', checkError);
      }
      
      if (existingItem) {
        // Update quantity
        console.log('🔄 Item exists, updating quantity...');
        const newQuantity = Math.min((existingItem.quantity || 1) + 1, 99);
        
        const { error: updateError } = await supabase
          .from('user_cart')
          .update({ 
            quantity: newQuantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);
        
        if (updateError) {
          console.error('❌ Update error:', updateError);
          throw updateError;
        }
        
        // Update local state
        setCartItems(prev => 
          prev.map(item => 
            item.id === service.id 
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        
        console.log(`✅ Quantity updated to ${newQuantity}`);
      } else {
        // Insert new item
        console.log('➕ Inserting new item...');
        const { data: newItem, error: insertError } = await supabase
          .from('user_cart')
          .insert([cartItemData])
          .select()
          .single();
        
        if (insertError) {
          console.error('❌ Insert error:', insertError);
          console.error('❌ Error details:', JSON.stringify(insertError, null, 2));
          throw insertError;
        }
        
        console.log('✅ New item inserted:', newItem);
        
        // Add to local state
        const cartItem = {
          id: service.id,
          title: service.title || 'Untitled Service',
          category: service.category || 'General',
          price: Number(service.price) || 5999,
          number: service.number || '00',
          quantity: 1,
          description: service.description || '',
          cart_id: newItem.id
        };
        
        setCartItems(prev => [...prev, cartItem]);
      }
      
      console.log('✅ Cart saved to database successfully!');
      
    } catch (error) {
      console.error('❌ Error saving to database:', error);
      console.log('🔄 Falling back to local cart...');
      addToLocalCart(service);
    }
  };

  // ✅ Add to local cart (for guests or fallback)
  const addToLocalCart = (service) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === service.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === service.id
            ? { ...item, quantity: Math.min((item.quantity || 1) + 1, 99) }
            : item
        );
      } else {
        const cartItem = {
          id: service.id,
          title: service.title || 'Untitled Service',
          category: service.category || 'General',
          price: Number(service.price) || 5999,
          number: service.number || '00',
          quantity: 1,
          description: service.description || ''
        };
        return [...prevItems, cartItem];
      }
    });
  };

  // ✅ Remove from cart
  const removeFromCart = async (id) => {
    if (user) {
      try {
        const item = cartItems.find(i => i.id === id);
        if (item && item.cart_id) {
          await supabase
            .from('user_cart')
            .delete()
            .eq('id', item.cart_id);
          
          console.log('✅ Item removed from database');
        }
      } catch (error) {
        console.error('❌ Error removing from database:', error);
      }
    }
    
    // Remove from local state
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = async (id, quantity) => {
    const newQuantity = Math.max(1, Math.min(99, Number(quantity) || 1));
    
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    if (user) {
      try {
        const item = cartItems.find(i => i.id === id);
        if (item && item.cart_id) {
          await supabase
            .from('user_cart')
            .update({ 
              quantity: newQuantity,
              updated_at: new Date().toISOString()
            })
            .eq('id', item.cart_id);
          
          console.log('✅ Quantity updated in database');
        }
      } catch (error) {
        console.error('❌ Error updating quantity in database:', error);
      }
    }
    
    // Update local state
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) {
      return;
    }
    
    if (user) {
      try {
        await supabase
          .from('user_cart')
          .delete()
          .eq('user_id', user.id);
        
        console.log('✅ Cart cleared from database');
      } catch (error) {
        console.error('❌ Error clearing cart from database:', error);
      }
    }
    
    // Clear local state
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // ✅ Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return total + (price * quantity);
    }, 0);
  };

  // ✅ Get cart count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + (Number(item.quantity) || 1), 0);
  };

  // ✅ Check if item is in cart
  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  // ✅ Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem('customer_session');
    setUser(null);
    loadCartFromLocalStorage();
    console.log('✅ Logged out successfully');
  };

  // ✅ Sync local cart to database after login
  const syncLocalCartToDatabase = async (userId) => {
    const localCart = cartItems;
    
    if (localCart.length === 0) return;
    
    try {
      for (const item of localCart) {
        // Check if item exists
        const { data: existing } = await supabase
          .from('user_cart')
          .select('*')
          .eq('user_id', userId)
          .eq('service_id', item.id)
          .single();
        
        if (existing) {
          // Update quantity
          const newQuantity = Math.min((existing.quantity || 0) + (item.quantity || 1), 99);
          
          await supabase
            .from('user_cart')
            .update({ 
              quantity: newQuantity,
              updated_at: new Date().toISOString()
            })
            .eq('id', existing.id);
        } else {
          // Insert new item
          await supabase
            .from('user_cart')
            .insert([{
              user_id: userId,
              service_id: item.id,
              title: item.title,
              category: item.category,
              price: item.price,
              number: item.number,
              quantity: item.quantity,
              description: item.description
            }]);
        }
      }
      
      console.log('✅ Local cart synced to database');
      
      // Reload from database
      await loadCartFromDatabase(userId);
      
      // Clear localStorage
      localStorage.removeItem('cart');
      
    } catch (error) {
      console.error('❌ Error syncing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      // State
      cartItems,
      isCartOpen,
      user,
      loading,
      
      // Actions
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      logout,
      syncLocalCartToDatabase,
      
      // Getters
      getTotalPrice,
      getCartCount,
      isInCart,
      
      // Setters
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};