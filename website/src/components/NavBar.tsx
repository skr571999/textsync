import React from "react";
import { ThemeType } from "../services/model";

interface NavBarProps {
  handleToggleTheme: () => void;
  handleClearAll: () => void;
  theme: ThemeType;
  users: number;
}

const NavBar: React.FC<NavBarProps> = ({
  handleToggleTheme,
  theme,
  users,
  handleClearAll,
}) => {
  return (
    <nav
      className="navbar navbar-dark bg-dark position-fixed"
      style={{ maxHeight: "10vh", top: "0", width: "100%" }}
    >
      <a className="navbar-brand" href="/" style={{ fontSize: "3vh" }}>
        TEXT<b>SYNC</b>
      </a>
      <div style={{ fontSize: "1.2rem" }}>
        <span
          onClick={handleClearAll}
          style={{ cursor: "pointer", marginRight: "1rem" }}
        >
          🧹
        </span>
        <span style={{ color: "white" }}>{users} 🧑</span>
        <span
          style={{
            margin: "0 1rem",
            textShadow: "0 0 5px yellow",
          }}
        >
          ⚡
        </span>

        <span
          onClick={handleToggleTheme}
          style={{ cursor: "pointer", marginRight: "1rem" }}
        >
          {theme.color === "#26262c" ? "🌙" : "☀"}
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
