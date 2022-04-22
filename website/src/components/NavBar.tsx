import React from "react";

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
      className="navbar navbar-dark bg-dark position-fixed"
      style={{ height: "3rem", top: "0", width: "100%" }}
    >
      <a className="navbar-brand" href="/" style={{ fontSize: "1.2rem" }}>
        {document.title}
      </a>
      <div style={{ fontSize: "1.2rem" }}>
        <button onClick={openSessionInfo}>Session-{userCount}</button>
        <button onClick={openSettings}>Settings</button>
      </div>
    </nav>
  );
};

export default NavBar;
