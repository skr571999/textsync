import React from "react";

interface SettingsModalProps {
  closeModal: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ closeModal }) => {
  return (
    <div>
      <button onClick={closeModal}>Close</button>
      <h2>Settings</h2>
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
        <input type="checkbox" name="saveLocal" id="saveLocal" />
      </div>
      <div>
        <p>Font size</p>
        <input type="number" name="fontSize" id="fontSize" />
      </div>
    </div>
  );
};

export default SettingsModal;
