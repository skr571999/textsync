import React from "react";

import People from "../images/People.png";
import Settings from "../images/Settings.png";

interface NavBarProps {
  openSettings: () => void;
  openSessionInfo: () => void;
  userCount: number;
}

const NavBar: React.FC<NavBarProps> = ({
  userCount,
  openSessionInfo,
  openSettings,
}) => {
  return (
    <nav
      className="navbar navbar-light"
      style={{
        height: "4rem",
        top: "0",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <a
        className="navbar-brand"
        href="/"
        style={{ fontSize: "1.5rem", color: "white" }}
      >
        {document.title}
        <span className="alpha">alpha</span>
      </a>
      <div style={{ fontSize: "1.2rem" }}>
        <button onClick={openSessionInfo} style={{ marginRight: "10px" }}>
          <img src={People} alt={People} />
          <span className="userCount">{userCount}</span>
        </button>
        <button onClick={openSettings}>
          <img src={Settings} alt="Settings" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
