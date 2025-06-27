import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Book } from '../types/bookType';

interface CartItem extends Book {
  quantity: number;
}

interface RentalItem extends Book {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  rentalItems: RentalItem[];
  addToCart: (book: Book, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkout: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [rentalItems, setRentalItems] = useState<RentalItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    const savedRentals = localStorage.getItem('rentals');
    if (savedRentals) {
      setRentalItems(JSON.parse(savedRentals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('rentals', JSON.stringify(rentalItems));
  }, [rentalItems]);

  const addToCart = (book: Book, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...book, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    setRentalItems((prevRentals) => [...prevRentals, ...cartItems]);
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.rentalPrice || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, rentalItems, addToCart, updateQuantity, removeFromCart, clearCart, checkout, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};