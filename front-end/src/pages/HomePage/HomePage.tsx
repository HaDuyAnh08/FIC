import React, { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import HeaderComponent from '../../components/Header';
//import Footer from '../../components/Footer';
import books from '../../asset/books.png';
import { BookRecommendation } from './BookRecommendation';

// CenteredImage Styles
export const centeredImageStyle = (isVisible: boolean): CSSProperties => ({
  width: '100%',
  maxWidth: '150px',
  opacity: isVisible ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  margin: '0 auto',
});

// Instruction Styles
export const instructionStyles = {
  container: {
    textAlign: 'center',
    marginBottom: '20px',
  } as CSSProperties,
  instruction: {
    display: 'inline-block',
    color: '#111',
    fontWeight: 'lighter',
    fontSize: '18px',
    fontFamily: "'Roboto', sans-serif",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    borderRight: '2px solid #111',
    animation: 'typing 3s steps(60, end) forwards, blink-cursor 3s steps(1, end) forwards',
  } as CSSProperties,
};

// CSS Animations for Instruction
export const instructionAnimations = `
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink-cursor {
    0% { border-right: transparent; }
    100% { border-right: transparent; }
  }
`;

// HomePage Styles
export const homePageStyle: CSSProperties = {
  minHeight: '100vh', // Đổi thành minHeight để chứa nội dung dài
  width: '100%',
  backgroundColor: '#f5f5dc',
  position: 'relative',
  overflow: 'auto',
  paddingTop: '60px',
  paddingBottom: '60px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

// CenteredImage Component
export const CenteredImage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return <img src={books} alt="Books" style={centeredImageStyle(isVisible)} />;
};

// Instruction Component
export const Instruction: React.FC = () => {
  return (
    <div style={instructionStyles.container}>
      <style>{instructionAnimations}</style>
      <p style={instructionStyles.instruction}>
        Please register with your Gmail account to start using our website
      </p>
    </div>
  );
};

// HomePage Component
const HomePage: React.FC = () => {
  return (
    <div style={homePageStyle}>
      <HeaderComponent />
      <CenteredImage />
      <Instruction />
      <BookRecommendation />
    </div>
  );
};

export default HomePage;