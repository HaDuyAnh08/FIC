import React, { useState, useEffect } from "react";
import logo from "../../asset/logo.png"; // Adjusted path
import books from "../../asset/books.png"; // Adjusted path
import userIcon from "../../asset/user-icon.png"; // Adjusted path
//import CSSMotion from 'rc-motion';

// Header Component
export const Header = () => {
  const logoTextContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    left: "20px",
    display: "flex",
    alignItems: "center",
    color: "#1E90FF",
  };

  const logoStyle: React.CSSProperties = {
    height: "30px",
    marginRight: "10px",
  };

  return (
    <div style={logoTextContainerStyle}>
      <img src={logo} alt="LIBERO Logo" style={logoStyle} />
      <h1>LIBERO Book Store</h1>
    </div>
  );
};

// CenteredImage Component
export const CenteredImage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const booksImageStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "1200px",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  return <img src={books} alt="Books" style={booksImageStyle} />;
};

// UserMenu Component
export const UserMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      if (timer) clearTimeout(timer); // Cleanup timer on unmount
    };
  }, []);

  const userIconStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    right: "20px",
    height: "30px",
    cursor: "pointer",
    opacity: isVisible ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  const optionsStyle: React.CSSProperties = {
    position: "absolute",
    top: "60px",
    right: "20px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    padding: "5px 0",
    zIndex: 10,
    opacity: showOptions ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
    pointerEvents: showOptions ? "auto" : "none",
  };

  const optionStyle: React.CSSProperties = {
    padding: "5px 20px",
    color: "#1A73E8",
    textDecoration: "none",
    display: "block",
    fontFamily: "'Roboto', sans-serif",
    cursor: "pointer",
  };

  // Handle mouse events
  const handleMouseEnter = () => {
    setShowOptions(true);
    if (timer) clearTimeout(timer); // Clear any existing timer
  };

  const handleMouseLeave = () => {
    if (timer) clearTimeout(timer); // Clear any existing timer
    const newTimer = setTimeout(() => {
      setShowOptions(false); // Hide options after delay when mouse leaves
    }, 300); // 300ms delay to allow clicking
    setTimer(newTimer);
  };

  const handleOptionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from affecting parent
    if (timer) clearTimeout(timer); // Clear timer on click
    setShowOptions(false); // Hide after click
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={userIcon} alt="User Icon" style={userIconStyle} />
      <div style={optionsStyle}>
        <a href="/login" style={optionStyle} onClick={handleOptionClick}>Login</a>
        <a href="/register" style={optionStyle} onClick={handleOptionClick}>Register</a>
      </div>
    </div>
  );
};

// Instruction Component

export const Instruction = () => {
  const fullText = "Please register with Gmail to use our website";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const instructionStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "300px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#444",
    fontSize: "20px",
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    fontWeight: 300,
    letterSpacing: "0.5px",
    textAlign: "center",
    maxWidth: "80%",
    whiteSpace: "pre-wrap",
  };

  return <p style={instructionStyle}>{displayedText}</p>;
};
