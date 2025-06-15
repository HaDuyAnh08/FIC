import React from "react";
import { Header, CenteredImage, UserMenu, Instruction } from "./HomeComponents";

const HomePage: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#f5f5dc", position: "relative", overflow: "hidden" }}>
      <Header />
      <CenteredImage />
      <UserMenu />
      <Instruction />
    </div>
  );
};

export default HomePage;