import React from "react";
import { tabs } from "../../Constants/constants";
import { Link } from "../../Components/Link";

const NavPanel = () => {
  return (
    <div className="nav-panel-container">
      <ul className="nav-panel-ul">
        {tabs.map((tab) => {
          return (
            <li key={tab.name} className="nav-panel-li">
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

export default NavPanel;
