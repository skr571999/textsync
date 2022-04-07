import React from "react";
import { ThemeType } from "../services/model";

interface NavBarProps {
  handleToggleTheme: () => void;
  handleClearAll: () => void;
  handleCopyAll: () => void;
  theme: ThemeType;
  users: number;
}

const NavBar: React.FC<NavBarProps> = ({
  handleToggleTheme,
  theme,
  users,
  handleClearAll,
  handleCopyAll,
}) => {
  return (
    <nav
      className="navbar navbar-dark bg-dark position-fixed"
      style={{ height: "3rem", top: "0", width: "100%" }}
    >
      <a className="navbar-brand" href="/" style={{ fontSize: "1.2rem" }}>
        {document.title}
      </a>
      <div style={{ fontSize: "1.2rem" }}>
        <span
          onClick={handleClearAll}
          style={{ cursor: "pointer", marginRight: "1rem" }}
        >
          🧹
        </span>
        <span
          onClick={handleCopyAll}
          style={{ cursor: "pointer", marginRight: "1rem" }}
        >
          ✂️
        </span>
        <span style={{ color: "white", border: "1px solid grey" }}>
          {users} 🧑
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
