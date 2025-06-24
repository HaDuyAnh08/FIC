import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookDetail from "../pages/BookDetail";
import IntroducePage from "../pages/IntroducePage";
import CartPage from '../pages/CartPage';
import RentalStatusPage from '../pages/RentalStatusPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books" element={<HomePage />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/introduce" element={<IntroducePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/rental-status" element={<RentalStatusPage />} />
    </Routes>
  );
};

export default AppRouter;