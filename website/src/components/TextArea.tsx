import React from "react";

interface TextAreaProps {
  theme: any;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ handleChange, value, theme }) => {
  return (
    <div style={{ height: "100vh" }}>
      <textarea
        name="data"
        id="dataContainer"
        style={{
          minWidth: "100%",
          minHeight: "100%",
          paddingTop: "10vh",
          resize: "none",
          border: "none",
          zIndex: 0,
          ...theme,
        }}
        cols={30}
        rows={10}
        value={value}
        onChange={handleChange}
        placeholder="Type Here"
      ></textarea>
    </div>
  );
};

export default TextArea;
