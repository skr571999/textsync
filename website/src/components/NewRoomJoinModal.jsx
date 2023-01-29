import React, { useState } from 'react';

import Close from './../images/Close.png';
import BackArrow from './../images/BackArrow.png';

// interface NewRoomJoinModalProps {
//   handleRoomJoin: (roomId: string) => void;
//   openSessionInfo: () => void;
//   closeModal: () => void;
// }

const NewRoomJoinModal = ({ handleRoomJoin, openSessionInfo, closeModal }) => {
    const [newRoomId, setNewRoomId] = useState('');

    const handleNewRoomIdChange = (e) => {
        const value = e.target.value;
        setNewRoomId(value);
    };

    return (
        <div className="my-modal-background">
            <div className="my-modal-container">
                <div className="close-btn justify-space-between">
                    <button onClick={openSessionInfo}>
                        <img src={BackArrow} alt="BackArrow" />
                    </button>
                    <button onClick={closeModal}>
                        <img src={Close} alt="Close" />
                    </button>
                </div>
                <div className="my-modal-content">
                    <h2>Join another room</h2>
                    <div className="roomIdInput">
                        <input value={newRoomId} placeholder="Enter room Id" onChange={handleNewRoomIdChange} />
                    </div>
                    <button className="custom-btn" onClick={() => handleRoomJoin(newRoomId)}>
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewRoomJoinModal;
