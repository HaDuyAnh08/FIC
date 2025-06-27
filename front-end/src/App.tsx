import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./hooks/AuthContext";
import { CartProvider } from './hooks/CartContext';
import { BookProvider } from './hooks/BookContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BookProvider>
          <CartProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </CartProvider>
        </BookProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
