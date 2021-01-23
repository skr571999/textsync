import React from "react";
import { ThemeType } from "../services/model";

interface NavBarProps {
  handleSync: () => void;
  handleToggleTheme: () => void;
  theme: ThemeType;
  isSyncing: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  handleSync,
  handleToggleTheme,
  theme,
  isSyncing,
}) => {
  return (
    <nav
      className="navbar navbar-dark bg-dark position-fixed"
      style={{ maxHeight: "10vh", top: "0", width: "100%" }}
    >
      <a className="navbar-brand" href="/" style={{ fontSize: "3vh" }}>
        TEXT<b>SYNC</b>
      </a>
      <div>
        {isSyncing && (
          <div
            className="spinner-border text-light"
            role="status"
            style={{ width: "1.5rem", height: "1.5rem", borderWidth: ".15rem" }}
          ></div>
        )}
        <span
          onClick={handleToggleTheme}
          style={{ cursor: "pointer", margin: "0 1rem", fontSize: "3vh" }}
        >
          {theme.color === "#26262c" ? "🌙" : "☀"}
        </span>
        <button
          className="btn btn-light btn-sm"
          onClick={handleSync}
          style={{ fontSize: "2.5vh" }}
        >
          Sync
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
