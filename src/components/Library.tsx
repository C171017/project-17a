import { useAppSelector } from "../store/hooks";
import "../../css/library.css";

export default function Library() {
  const babyCount = useAppSelector((state) => state.counter.babyCount);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);

  return (
    <div className="library-container">
      <div className="square-box">
        <div>
          <span className="wood-text">baby</span>
          <span className="count-text">{babyCount}</span>
        </div>
        <div>
          <span className="wood-text">sperm</span>
          <span className="count-text">{producerSperm}</span>
        </div>
      </div>
    </div>
  );
}
