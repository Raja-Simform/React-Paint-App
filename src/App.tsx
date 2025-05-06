import "./App.css";
import Grid from "./Components/Grid";
import Color from "./Components/Color";
import { useState } from "react";


const generateRandomColor = (count: number) => {
  const hexCodes = "0123456789ABCDEF";
  const colors = [];
  for (let i = 0; i < count; i++) {
    let color = "#";
    for (let j = 0; j < 6; j++) {
      color += hexCodes[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  return colors;
};
const colorArray = generateRandomColor(600);

function App() {
  const rows = 20;
  const cols = 55;

  function generatingGrid() {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if ((i + j) % 2 === 0) {
          row.push("#fffcfc");
        } else {
          row.push("#d8d7d7");
        }
      }
      newGrid.push(row);
    }
    return newGrid;
  }

  const [draw, setDraw] = useState(false);
  const [currentColor, setCurrentColor] = useState({rightColor:"#ffffff",leftColor:"#ffffff"});
  const [gridCell, setGridCell] = useState(generatingGrid());

  const handleToggle = (valid: boolean) => {
    setDraw(valid);
  };
  const handleclear = () => {
    setGridCell(generatingGrid());
  };
  const handleGridRightClick = (row: number, col: number) => {
    if (draw) {
      setGridCell((prevColor) => {
        const temp = [...prevColor];
        temp[row] = [...temp[row]];
        temp[row][col] = currentColor.rightColor;
        return temp;
      });
    }
    return;
  };
  const handleGridLeftClick = (row: number, col: number) => {
    if (draw) {
      setGridCell((prevColor) => {
        const temp = [...prevColor];
        temp[row] = [...temp[row]];
        temp[row][col] = currentColor.leftColor;
        return temp;
      });
    }
    return;
  };
  // const handleColorSelect=(color:string)=>{
  //   setCurrentColor(color)
  // }
  const handleColorSelect = (color: string, button: "left" | "right") => {
    setCurrentColor((prev) => ({
      ...prev,
      ...(button === "left"
        ? { leftColor: color }
        : { rightColor: color }),
    }));
  };

  return (
    <>
      <h1 id="heading">Paint Board</h1>
      <Grid
        draw={draw}
        gridCell={gridCell}
        handleGridRightClick={handleGridRightClick}
        handleGridLeftClick={handleGridLeftClick}
        rows={rows}
        cols={cols}
      />
      <div className="flexbox">
      <Color
        colorArray={colorArray}
        handleColorSelect={handleColorSelect}
        currentColor={currentColor}
      />
      <div className="toggle">
        <button className="draw" onClick={() => handleToggle(!draw)}>
          {draw?"Stop Drawing":"Draw"}
        </button>
        <button className="clear" onClick={() => handleclear()}>
          Clear
        </button>
      </div>
      </div>
    </>
  );
}

export default App;
