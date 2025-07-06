import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AddBookPage from './pages/Page/AddBookPage';
import BookListPage from './pages/Page/BookListPage';

/** ✅ Component xử lý URL redirect: lưu token/role rồi chuyển về "/" */
const HandleRedirect: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const role = params.get('role');

    if (token) localStorage.setItem('token', token);
    if (role) localStorage.setItem('role', role);

    // 👇 Xoá token trên URL và chuyển sang trang chính
    navigate('/', { replace: true });
  }, [location, navigate]);

  return <p>Redirecting...</p>;
};

/** 🔐 Route cần token */
const RequireToken = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'http://localhost:5174/login';
    return null;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Trang nhận token từ URL và lưu vào localStorage */}
        <Route path="/redirect" element={<HandleRedirect />} />

        {/* ✅ Trang thêm sách */}
        <Route
          path="/"
          element={
            <RequireToken>
              <AddBookPage />
            </RequireToken>
          }
        />

        {/* ✅ Trang danh sách sách */}
        <Route
          path="/books"
          element={
            <RequireToken>
              <BookListPage />
            </RequireToken>
          }
        />

        {/* ❌ Bắt các đường dẫn không hợp lệ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
