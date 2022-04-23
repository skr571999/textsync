import React from "react";
import { ThemeType } from "../services/model";

import Close from "./../images/Close.png";

interface SettingsModalProps {
  closeModal: () => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  closeModal,
  setTheme,
  theme,
  fontSize,
  setFontSize,
}) => {
  const handleThemeChange = (e: any) => {
    const value = e.target.value;

    console.log("T ", value);
    if (value === "default" || value === "light" || value === "dark") {
      setTheme(value);
    }
  };

  const handleFontSizeChange = (e: any) => {
    const value = e.target.value;

    console.log("F ", value);
    if (value >= 10 && value <= 24) {
      setFontSize(value);
    } else {
      console.log("Invalid Font size value");
    }
  };

  return (
    <div className="my-modal-background">
      <div className="my-modal-container">
        <div className="close-btn">
          <button onClick={closeModal}>
            <img src={Close} alt="Close" />
          </button>
        </div>
        <div className="my-modal-content">
          <h2>Settings</h2>
          <div className="settings-container">
            <div>
              <p>Theme</p>
              <select
                name="theme"
                id="theme"
                value={theme}
                onInput={handleThemeChange}
              >
                <option value="default">Default</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <p>Save locally</p>
              <input
                style={{ height: "1.5rem", width: "1.5rem" }}
                type="checkbox"
                name="saveLocal"
                id="saveLocal"
              />
            </div>
            <div>
              <p>Font size</p>
              <input
                style={{ width: "4rem", textAlign: "right" }}
                type="number"
                name="fontSize"
                onInput={handleFontSizeChange}
                id="fontSize"
                value={fontSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
