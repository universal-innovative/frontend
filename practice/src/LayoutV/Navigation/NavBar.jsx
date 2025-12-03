import React from "react";
import { tabs } from "../../Constants/constants";
import { Link } from "../../Components/Link";

const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <ul className="nav-bar-ul">
        {tabs.map((tab) => {
          return (
            <li key={tab.name} className="nav-bar-li">
              <button>
                <Link to={tab.route}>{tab.name}</Link>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavBar;
