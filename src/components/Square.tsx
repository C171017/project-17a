import { useAppSelector } from "../store/hooks";
import "../../css/square.css";

export default function Square() {
  const consumerSperm = useAppSelector((state) => state.counter.consumerSperm);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);
  
  // Calculate total sperm and square size
  const totalSperm = consumerSperm + producerSperm;
  const squareSize = Math.sqrt(totalSperm) * 10; // Scale factor of 10
  
  // Calculate rectangle heights as percentages
  const consumerHeight = totalSperm > 0 ? (consumerSperm / totalSperm) * 100 : 0;
  const producerHeight = totalSperm > 0 ? (producerSperm / totalSperm) * 100 : 0;
  
  return (
    <div className="square-container">
      <div 
        className="square" 
        style={{ 
          width: `${squareSize}px`, 
          height: `${squareSize}px` 
        }}
      >
        <div className="rectangles-container">
          <div 
            className="consumer-rectangle"
            style={{ height: `${consumerHeight}%` }}
          >
            <span className="rectangle-value">{consumerSperm}</span>
          </div>
          <div 
            className="producer-rectangle"
            style={{ height: `${producerHeight}%` }}
          >
            <span className="rectangle-value">{producerSperm}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
