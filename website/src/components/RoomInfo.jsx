import React, { useState } from 'react';

import Close from './../images/Close.png';

const RoomInfo = ({ handleRoomJoin, closeModal, roomId }) => {
    const [newRoomId, setNewRoomId] = useState(roomId);
    const handleNewRoomIdChange = e => setNewRoomId(e.target.value);

    return (
        <>
            <div className="close-btn">
                <button onClick={closeModal}>
                    <img src={Close} alt="Close" />
                </button>
            </div>
            <div className="my-modal-content">
                <h2>Join room</h2>
                <div className="roomIdInput">
                    <input value={newRoomId} placeholder="Enter room Id" onChange={handleNewRoomIdChange} />
                    <button className="join-btn" onClick={() => handleRoomJoin(newRoomId)}>
                        Join
                    </button>
                </div>
            </div>
        </>
    );
};

export default RoomInfo;
