import React from 'react';

const TextArea = ({ handleChange, value, themeColor, fontSize }) => {
    return (
        <div
            style={{
                height: '100%',
                padding: '.3rem',
                backgroundImage: 'linear-gradient(to bottom, white, black)',
            }}
        >
            <textarea
                name="data"
                id="dataContainer"
                style={{ fontSize: `${fontSize}px`, ...themeColor }}
                cols={30}
                rows={10}
                value={value}
                onChange={handleChange}
                placeholder="Type here"
            ></textarea>
        </div>
    );
};

export default TextArea;
