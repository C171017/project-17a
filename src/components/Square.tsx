import { useAppSelector } from "../store/hooks";
import "../../css/square.css";

export default function Square() {
  const squareValue = useAppSelector((state) => state.counter.squareValue);
  
  // Calculate square size based on value (area = side², so side = √value)
  const squareSize = Math.sqrt(squareValue) * 10; // Scale factor of 10
  
  return (
    <div className="square-container">
      <div 
        className="square" 
        style={{ 
          width: `${squareSize}px`, 
          height: `${squareSize}px` 
        }}
      >
        <span className="square-value">{squareValue}</span>
      </div>
    </div>
  );
}
