import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router/router';
import { CartProvider } from './hooks/CartContext';


const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;