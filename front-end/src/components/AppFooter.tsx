import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
const AppFooter: React.FC = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "white", padding: "40px 20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Brand and description */}
        <div style={{ flex: "1 1 400px", marginBottom: "30px" }}>
         <h2 style={{ color: "#FF6347", fontSize: "28px", fontWeight: "bold", letterSpacing: "1px" }}>
      LIBERO.
      </h2>

          <p style={{ lineHeight: "1.7" }}>
            LIBERO Book Store provides a wide range of books to ignite your knowledge and imagination.
          </p>
          {/* Social icons */}
          <div style={{ marginTop: "10px" }}>
            <a href="https://www.facebook.com/Libero.School" target="_blank" rel="noreferrer" style={{ marginRight: "10px", color: "white" }}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://youtube.https://www.youtube.com/@VienLibero" target="_blank" rel="noreferrer" style={{ marginRight: "10px", color: "white" }}>
            <i className="fab fa-youtube"></i>
            </a>
            <a href="https://linkedin.https://www.linkedin.com/company/libero-school" target="_blank" rel="noreferrer" style={{ color: "white" }}>
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Company links */}
        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <h3>COMPANY</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="/contact" style={{ color: "#1E90FF", textDecoration: "none" }}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="/about" style={{ color: "#1E90FF", textDecoration: "none" }}>
                About Us
              </a>
            </li>
            <li>
              <a href="/privacy" style={{ color: "#1E90FF", textDecoration: "none" }}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
          <h3>GET IN TOUCH</h3>
          <p>Email: contact@liberobookstore.com</p>
          <p>Phone: +84 123 456 789</p>
          <p>Address: Số 6-B12, KĐT Mỹ Đình 1, P.Cầu Diễn, Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam</p>
        </div>
      </div>

      {/* Divider */}
      <hr style={{ borderColor: "#444", margin: "20px 0" }} />

      {/* Copyright */}
      <p style={{ textAlign: "center", margin: 0 }}>
        © 2025 LIBERO Book Store. All rights reserved.
      </p>
    </footer>
  );
};

export default AppFooter;
