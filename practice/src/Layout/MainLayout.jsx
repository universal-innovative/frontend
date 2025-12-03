import React, { useState } from "react";
import { Search } from "../Pages";
import Header from "./Navigation/Header";
import NavPanel from "./Navigation/NavPanel";
import { Outlet } from "../router/Outlet";

const MainLayout = ({ isFullView }) => {
  return (
    <div className="h-layout">
      {isFullView ? (
        <>
          <Header />
          <NavPanel />
        </>
      ) : null}

      <Outlet />
    </div>
  );
};

export default MainLayout;
