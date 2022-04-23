import React from "react";

import Cut from "./../images/Cut.png";
import Copy from "./../images/Copy.png";
import People from "../images/People.png";
import Settings from "../images/Settings.png";
import GitHub from "../images/GitHub.png";

interface NavBarProps {
  openSettings: () => void;
  openSessionInfo: () => void;
  copyAllText: () => void;
  cutAllText: () => void;
  userCount: number;
}

const NavBar: React.FC<NavBarProps> = ({
  userCount,
  openSessionInfo,
  openSettings,
  copyAllText,
  cutAllText,
}) => {
  return (
    <nav
      className="navbar navbar-light"
      style={{
        minHeight: "4rem",
        top: "0",
        width: "100%",
        backgroundColor: "black",
        position: "fixed",
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
      <div className="nav-action-container">
        <button
          onClick={cutAllText}
          style={{ marginRight: "10px" }}
          title="Cut all text"
        >
          <img src={Cut} alt="Cut" style={{ width: "25px", height: "25px" }} />
        </button>
        <button
          onClick={copyAllText}
          style={{ marginRight: "10px" }}
          title="Copy all text"
        >
          <img
            src={Copy}
            alt="Copy"
            style={{ width: "25px", height: "25px" }}
          />
        </button>
        <button
          onClick={openSessionInfo}
          style={{ marginRight: "10px" }}
          title="People"
        >
          <img src={People} alt="People" />
          <span className="userCount">{userCount}</span>
        </button>
        <button
          style={{ marginRight: "10px" }}
          onClick={openSettings}
          title="settings"
        >
          <img src={Settings} alt="Settings" />
        </button>
        <a
          href="https://github.com/skrmain/LiveCollab"
          target="_blank"
          title="GitHub"
          rel="noopener noreferrer"
        >
          <img src={GitHub} alt="GitHub" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
