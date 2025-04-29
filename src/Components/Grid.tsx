
interface GridProps{
  draw:boolean;
  gridCell: string[][];
  rows:number;
  cols:number;
  handleGridRightClick:(i:number,j:number)=>void;
  handleGridLeftClick:(i:number,j:number)=>void;
}
export default function Grid({draw,gridCell,handleGridRightClick,handleGridLeftClick,rows,cols}:GridProps) {
 
  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>, i: number, j: number) => {
    if (!draw) return;

    
    if (e.buttons === 1) {
      handleGridLeftClick(i, j);
    } else if (e.buttons === 2) {
      handleGridRightClick(i, j);
    }
  };

   
  return (
    <div className="gridContainer">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="row">
          {Array.from({ length: cols }).map((_, j) => {
            // const isEven = (i + j) % 2 === 0;
            return (
              <div
                key={j}
                className={"cell"}
                style={{background:gridCell[i][j]}}
                onClick={()=>handleGridLeftClick(i,j)}
                onContextMenu={(e)=>{
                  e.preventDefault();
                  handleGridRightClick(i,j);
                }}
                onMouseOver={(e)=>{
                  //console.log("clickdrag")
                  // if(e.buttons===1 && draw){
                  //   handleGridClick(i,j);
                  // }
                  handleMouseOver(e,i,j)
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}


