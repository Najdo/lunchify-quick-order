
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, OrderSummary } from '@/lib/types';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  placeOrder: () => Promise<OrderSummary>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('euricom-lunch-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('euricom-lunch-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (item: CartItem) => {
    // Check if item is already in cart
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.menuItemId === item.menuItemId && 
      JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems(prev => [...prev, { ...item, id: crypto.randomUUID() }]);
    }
    
    toast.success(`${item.name} toegevoegd aan je bestelling`);
  };
  
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info('Item verwijderd uit je bestelling');
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.info('Bestelling gewist');
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );
  };
  
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  const placeOrder = async (): Promise<OrderSummary> => {
    // This would connect to a backend API in a real application
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderSummary: OrderSummary = {
          items: [...cartItems],
          subtotal: getCartTotal(),
          orderDate: new Date(),
          status: 'confirmed'
        };
        
        // Clear the cart after successful order
        clearCart();
        
        resolve(orderSummary);
      }, 1000);
    });
  };
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    placeOrder
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
