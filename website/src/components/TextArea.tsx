import React from "react";

interface TextAreaProps {
  themeColor: any;
  fontSize: number;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  handleChange,
  value,
  themeColor,
  fontSize,
}) => {
  return (
    <div
      style={{
        height: "100%",
        padding: ".3rem",
        backgroundImage: "linear-gradient(to bottom, white, black)",
      }}
    >
      <textarea
        name="data"
        id="dataContainer"
        style={{
          minWidth: "100%",
          minHeight: "99%",
          paddingTop: "5rem",
          resize: "none",
          border: "none",
          zIndex: 0,
          fontSize: `${fontSize}px`,
          ...themeColor,
        }}
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
