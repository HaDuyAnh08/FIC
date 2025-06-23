import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookDetail from "../pages/BookDetail";
import IntroducePage from "../pages/IntroducePage";
import CartPage from '../pages/CartPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<HomePage />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/introduce" element={<IntroducePage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRouter;
