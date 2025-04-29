

import { useState } from "react";

interface ColorProps {
  colorArray: string[];
  handleColorSelect: (color: string, button: "left" | "right") => void;
  currentColor: { rightColor: string; leftColor: string };
}

export default function Color({
  colorArray,
  handleColorSelect,
  currentColor,
}: ColorProps) {

  const [selectedButton, setSelectedButton] = useState<"left" | "right">("right");

  const onClickColorHandler = (color: string) => {
    handleColorSelect(color, selectedButton);
  };

  return (
    <div className="color-picker">
      <div className="button-select">
       <button
          className={selectedButton === "left" ? "active" : ""}
          onClick={() => setSelectedButton("left")}
        >
          Select Left Color
        </button>
        <button
          className={selectedButton === "right" ? "active" : ""}
          onClick={() => setSelectedButton("right")}
        >
          Select Right Color
        </button>
       
      </div>

      <div className="color-grid">
        {colorArray.map((color, i) => (
          <div
            key={i}
            className="color-box"
            onClick={() => onClickColorHandler(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="current-colors">
        
       <div className="right">
       <label className="label">Left Color</label>
        <div
          className="currentColor"
          style={{ backgroundColor: currentColor.leftColor }}
        ></div>
       </div>
       <div className="left">
        <label className="label">Right Color</label>
        <div
          className="currentColor"
          style={{ backgroundColor: currentColor.rightColor }}
        ></div>
        </div>
      </div>
    </div>
  );
}



