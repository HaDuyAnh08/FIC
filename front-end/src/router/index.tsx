import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import BookDetail from '../pages/BookDetail';
// Import Login, Register, Contact, About, Privacy components

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/book/:id" element={<BookDetail />} />
    <Route path="/login" element={<div>Login Page</div>} />
    <Route path="/register" element={<div>Register Page</div>} />
    <Route path="/contact" element={<div>Contact Page</div>} />
    <Route path="/about" element={<div>About Page</div>} />
    <Route path="/privacy" element={<div>Privacy Page</div>} />
  </Routes>
);

export default AppRoutes;