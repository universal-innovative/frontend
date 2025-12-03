import React from "react";
import NavBar from "./Navigation/NavBar";
import Header from "./Navigation/Header";
import "./index.css";
import { Outlet } from "../router/Outlet";
const MainLayout = (isFullView) => {
  return (
    <div className="v-layout">
      {isFullView ? (
        <Header>
          <NavBar />
        </Header>
      ) : null}

      <Outlet />
    </div>
  );
};

export default MainLayout;
