import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on initial state
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Add service to cart with better validation
  const addToCart = (service) => {
    if (!service || !service.id) {
      console.error('Invalid service object:', service);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === service.id);

      if (existingItem) {
        // Update quantity
        return prevItems.map(item =>
          item.id === service.id
            ? { 
                ...item, 
                quantity: Math.min((item.quantity || 1) + 1, 99) // Max 99
              }
            : item
        );
      } else {
        // Add new item with proper structure
        const cartItem = {
          id: service.id,
          title: service.title || 'Untitled Service',
          category: service.category || 'General',
          price: Number(service.price) || 5999,
          number: service.number || '00',
          quantity: 1,
          description: service.description || 'No description available.',
          addedAt: new Date().toISOString()
        };
        return [...prevItems, cartItem];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update quantity with validation
  const updateQuantity = (id, quantity) => {
    const newQuantity = Math.max(1, Math.min(99, Number(quantity) || 1));
    
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Clear cart with confirmation
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
    }
  };

  // Get total price with tax calculation
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return total + (price * quantity);
    }, 0);
  };

  // Get total with tax (10%)
  const getTotalWithTax = () => {
    const subtotal = getTotalPrice();
    const tax = Math.round(subtotal * 0.1);
    return subtotal + tax;
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + (Number(item.quantity) || 1), 0);
  };

  // Get item count (unique items)
  const getItemCount = () => {
    return cartItems.length;
  };

  // Check if item is in cart
  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  // Get item by ID
  const getItem = (id) => {
    return cartItems.find(item => item.id === id);
  };

  // Increase quantity by 1
  const increaseQuantity = (id) => {
    updateQuantity(id, (getItem(id)?.quantity || 0) + 1);
  };

  // Decrease quantity by 1
  const decreaseQuantity = (id) => {
    const item = getItem(id);
    if (item) {
      updateQuantity(id, (item.quantity || 1) - 1);
    }
  };

  // Calculate subtotal for a specific item
  const getItemSubtotal = (id) => {
    const item = getItem(id);
    if (!item) return 0;
    return (Number(item.price) || 0) * (Number(item.quantity) || 1);
  };

  // Toggle cart sidebar/drawer
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Open cart
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Close cart
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Load cart from localStorage (for manual refresh)
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        return parsedCart;
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    return [];
  };

  // Clear localStorage cart
  const clearLocalStorage = () => {
    localStorage.removeItem('cart');
  };

  // Export cart data
  const exportCart = () => {
    return {
      items: cartItems,
      subtotal: getTotalPrice(),
      tax: Math.round(getTotalPrice() * 0.1),
      total: getTotalWithTax(),
      itemCount: getItemCount(),
      cartCount: getCartCount(),
      timestamp: new Date().toISOString()
    };
  };

  // Import cart data
  const importCart = (cartData) => {
    if (cartData && cartData.items) {
      setCartItems(cartData.items);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotalPrice,
      getTotalWithTax,
      getCartCount,
      getItemCount,
      isInCart,
      getItem,
      getItemSubtotal,
      toggleCart,
      openCart,
      closeCart,
      loadCartFromStorage,
      clearLocalStorage,
      exportCart,
      importCart
    }}>
      {children}
    </CartContext.Provider>
  );
};