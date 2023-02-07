import React from 'react';

import ConnectingImg from '../images/Connecting.png';

const Connecting = () => (
    <div className="my-modal-content">
        <img src={ConnectingImg} alt="Connecting" style={{ width: '4rem', height: '4rem', marginBottom: '2rem', marginTop: '3rem' }} />
        <h2>Connecting...</h2>
    </div>
);
export default Connecting;
