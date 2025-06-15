import React from "react";
import logo from "../asset/logo.png";

const Register: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f5f5dc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  const logoStyle: React.CSSProperties = {
    height: "50px",
    marginBottom: "20px",
  };

  const registerButtonStyle: React.CSSProperties = {
    padding: "12px 140px",
    backgroundColor: "#1A73E8",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontFamily: "'Roboto', sans-serif",
    cursor: "pointer",
    borderRadius: "5px",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <img src={logo} alt="LIBERO Logo" style={logoStyle} />
      <h1>Register with Gmail</h1>
      <a href="https://accounts.google.com/signup" style={registerButtonStyle}>
        Register with Gmail
      </a>
    </div>
  );
};

export default Register;