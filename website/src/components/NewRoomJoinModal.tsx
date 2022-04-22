import React, { useState } from "react";

interface NewRoomJoinModalProps {
  handleRoomJoin: (roomId: string) => void;
  closeModal: () => void;
}

const NewRoomJoinModal: React.FC<NewRoomJoinModalProps> = ({
  handleRoomJoin,
  closeModal,
}) => {
  const [newRoomId, setNewRoomId] = useState("");

  const handleNewRoomIdChange = (e: any) => {
    const value = e.target.value;
    setNewRoomId(value);
  };
  return (
    <div>
      <button onClick={closeModal}>Close</button>
      <h2>Join another room</h2>
      <div>
        Room Id :
        <input value={newRoomId} onChange={handleNewRoomIdChange} />
        <button onClick={() => handleRoomJoin(newRoomId)}>Join</button>
      </div>
    </div>
  );
};

export default NewRoomJoinModal;
