import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import SearchBar from "./SearchBar";
import Banner from "./Banner"; // Fixed casing to match Banner.tsx
import bannerImage from "../../assets/banner-image.jpg";
import { isAuthenticated, login } from "../../utils/auth";
import { useAuth } from "../../hooks/AuthContext";
import { useBook } from "../../hooks/BookContext";
import { getAllBooks } from "../../services/bookService";
import type { Book } from "../../types/bookType";

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const location = useLocation();
  const { setToken } = useAuth();
  const { setBooks } = useBook();

  const { isLoading, error, data: books = [] } = useQuery<Book[], Error>({
    queryKey: ["books", "all"],
    queryFn: getAllBooks,
  });

  useEffect(() => {
    setBooks(books);
  }, [books, setBooks]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("user", user);
      setToken(token);
      login();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(isAuthenticated());
    }
  }, [location, setToken]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <div>
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Banner imageUrl={bannerImage} altText="Book Store Banner" />
      <SearchBar />
      <AppFooter />
    </div>
  );
};

export default HomePage;