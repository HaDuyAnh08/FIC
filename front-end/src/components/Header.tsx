import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import logo from "../asset/logo.png"; // Adjusted path
import userIcon from "../asset/user-icon.png"; // Adjusted path
import cartIcon from "../asset/cart-icon.png"; // Adjusted path

const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");

  const handleMenuClick = (e: { key: string }) => {
    setCurrent(e.key);
  };

  const handleUserClick = (e: { key: string }) => {
    if (e.key === "login") window.location.href = "/login";
    if (e.key === "register") window.location.href = "/register";
  };

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#f5f5dc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1000,
  };

  const logoStyle: React.CSSProperties = {
    height: "40px",
    marginRight: "10px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    color: "#1E90FF",
    fontFamily: "'Roboto', sans-serif",
    marginRight: "20px", // Space between title and dropdown
  };

  const rightSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginRight: "20px", // Push the icons leftward from the right edge
  };

  const userIconStyle: React.CSSProperties = {
    height: "30px",
    cursor: "pointer",
  };

  const cartIconStyle: React.CSSProperties = {
    height: "30px",
    cursor: "pointer",
    marginLeft: "20px",
  };

  const textbookMenu = (
    <Menu onClick={handleMenuClick} selectedKeys={[current]} mode="vertical">
      <Menu.Item key="kinhte">Kinh tế</Menu.Item>
      <Menu.Item key="truyenthong">Truyền thông</Menu.Item>
      <Menu.Item key="congnghe">Công nghệ</Menu.Item>
      <Menu.Item key="selfhelp">Self-Help</Menu.Item>
      <Menu.Item key="thieunhi">Thiếu nhi</Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu onClick={handleUserClick}>
      <Menu.Item key="login">Login</Menu.Item>
      <Menu.Item key="register">Register</Menu.Item>
    </Menu>
  );

  const textbook: React.CSSProperties = {
    cursor: "pointer",
    fontWeight: "normal",
    color: "#1E90FF",
    fontFamily: "'Roboto', sans-serif", // Updated font to match title
    fontSize: "20px"
  };

  return (
    <div style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="LIBERO Logo" style={logoStyle} />
        <span style={titleStyle}>LIBERO Book Store</span>
        <Dropdown overlay={textbookMenu} trigger={["hover"]}>
          <span style={textbook}>Textbook</span>
        </Dropdown>
      </div>
      <div style={rightSectionStyle}>
        <Dropdown overlay={userMenu} trigger={["hover"]}>
          <img src={userIcon} alt="User Icon" style={userIconStyle} />
        </Dropdown>
        <img src={cartIcon} alt="Cart Icon" style={cartIconStyle} />
      </div>
    </div>
  );
};

export default Header;