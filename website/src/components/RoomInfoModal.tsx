import React from "react";

import Close from "./../images/Close.png";
import Copy from "./../images/Copy.png";

interface RoomInfoModalProps {
  roomId: string;
  openNewRoomJoin: () => void;
  closeModal: () => void;
}

const RoomInfoModal: React.FC<RoomInfoModalProps> = ({
  roomId,
  openNewRoomJoin,
  closeModal,
}) => {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
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
          <h2>Current Room Id</h2>
          <h3>
            {roomId}
            <button onClick={copyRoomId}>
              <img src={Copy} alt="Copy" />
            </button>
          </h3>

          <button className="custom-btn" onClick={openNewRoomJoin}>
            Join another Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomInfoModal;
