import React from "react";

import Connecting from "../images/Connecting.png";

interface ConnectingModalProps {}

const ConnectingModal: React.FC<ConnectingModalProps> = () => {
  return (
    <div className="my-modal-background">
      <div className="my-modal-container">
        <div className="my-modal-content">
          <h2>Connecting...</h2>
          <img
            src={Connecting}
            alt="Connecting"
            style={{
              width: "60px",
              height: "60px",
              marginTop: "4rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectingModal;
