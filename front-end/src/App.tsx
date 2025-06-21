import { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import type { Book, CartItem } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
});

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (book: Book, quantity: number) => {
    setCart((prev) => [...prev, { ...book, quantity }]);
    alert(`${quantity} x ${book.title} added to cart!`);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <div style={{ flex: 1, paddingTop: '70px', paddingBottom: '120px' }}>
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </CartContext.Provider>
  );
};

export default App;