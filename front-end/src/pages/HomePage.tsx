import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { getAllBooks } from "../services/bookService";
import type { Book } from "../types/bookType";
import { isAuthenticated, login } from "../utils/auth";

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const { isLoading, error } = useQuery<Book[], Error>({
    queryKey: ["books", "all"],
    queryFn: getAllBooks,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      login();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(isAuthenticated());
    }
  }, [location]);

  const handleNavigation = () => {
    if (!isLoggedIn) {
      alert("Please login to continue.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <div onClick={handleNavigation}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default HomePage;
