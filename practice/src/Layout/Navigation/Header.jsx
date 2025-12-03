import React from "react";

const Header = ({ tabName }) => {
  return (
    <header className="header-v">
      <h1 className="header">{tabName}</h1>
    </header>
  );
};

export default Header;
