import React from "react";

const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#333",
    color: "white",
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
  };

  const linkStyle: React.CSSProperties = {
    color: "#1E90FF",
    textDecoration: "none",
    margin: "0 10px",
  };

  return (
    <div style={footerStyle}>
      <div>
        <a href="/contact" style={linkStyle}>Contact Us</a>
        <a href="/about" style={linkStyle}>About Us</a>
        <a href="/privacy" style={linkStyle}>Privacy Policy</a>
      </div>
      <p style={{ marginTop: "10px" }}>
        Email: contact@liberobookstore.com | Phone: +84 123 456 789
      </p>
      <p>© 2025 LIBERO Book Store. All rights reserved.</p>
    </div>
  );
};

export default Footer;