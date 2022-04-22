import React from "react";

interface ConnectingModalProps {}

const ConnectingModal: React.FC<ConnectingModalProps> = () => {
  return (
    <div className="m-5 p-5 text-center">
      <h2>Trying to Connect...</h2>
    </div>
  );
};

export default ConnectingModal;
