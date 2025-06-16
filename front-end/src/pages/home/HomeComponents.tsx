import React, { useState, useEffect } from "react";
import books from "../../asset/books.png";

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

// Instruction Component

export const Instruction = () => {
  const containerStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "350px",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
  };

  const instructionStyle: React.CSSProperties = {
    display: "inline-block",
    color: "#111",
    fontWeight: "lighter",
    fontSize: "18px",
    fontFamily: "'Roboto', sans-serif",
    whiteSpace: "nowrap",
    overflow: "hidden",
    borderRight: "2px solid #111",
    animation: "typing 3s steps(60, end) forwards, blink-cursor 3s steps(1, end) forwards",
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }
          @keyframes blink-cursor {
            0% {
              border-right: transparent;
            }
            100% {
              border-right: transparent;
            }
          }
        `}
      </style>
      <p style={instructionStyle}>
        Please register with your Gmail account to start using our website
      </p>
    </div>
  );
};