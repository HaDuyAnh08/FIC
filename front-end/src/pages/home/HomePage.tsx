import React from "react";
import { CenteredImage, Instruction } from "./HomeComponents";
import HeaderComponent from "../../components/Header";
import Footer from "../../components/Footer";
import BookRecommendation from './BookRecommendation';

const HomePage: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#f5f5dc", position: "relative", overflow: "hidden", paddingTop: "60px", paddingBottom: "60px" }}>
      <HeaderComponent />
      <CenteredImage />
      <Instruction />
      <BookRecommendation/>
      <Footer />
    </div>
  );
};

export default HomePage;