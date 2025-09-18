import { useAppSelector } from "../store/hooks";
import "../../css/library.css";

export default function Library() {
  const fuckCount = useAppSelector((state) => state.counter.fuckCount);

  return (
    <div className="library-container">
      <div className="square-box">
        <span className="wood-text">baby</span>
        <span className="count-text">{fuckCount}</span>
      </div>
    </div>
  );
}
