import React from 'react';

const ModalWrapper = Component => {
    return function ModalComponent({ ...props }) {
        return (
            <div className="my-modal-background">
                <div className="my-modal-container">
                    <Component {...props} />
                </div>
            </div>
        );
    };
};

export default ModalWrapper;
