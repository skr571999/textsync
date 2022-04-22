import React from "react";

import Close from "./../images/Close.png";

interface SettingsModalProps {
  closeModal: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ closeModal }) => {
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
              <select name="theme" id="theme">
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
                id="fontSize"
                value={16}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
