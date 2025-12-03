import React from "react";

const Header = ({ children }) => {
  return (
    <header className="header-h">
      <div>{children}</div>
    </header>
  );
};

export default Header;
