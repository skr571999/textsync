import React from "react";

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
    <div>
      <button onClick={closeModal}>Close</button>
      <h2>Current Room Id</h2>
      <h3>
        {roomId} <button onClick={copyRoomId}>Copy</button>
      </h3>

      <button onClick={openNewRoomJoin}>Join another Room</button>
    </div>
  );
};

export default RoomInfoModal;
