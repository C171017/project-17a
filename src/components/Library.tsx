import { useAppSelector } from "../store/hooks";
import "../../css/library.css";

export default function Library() {
  const fuckCount = useAppSelector((state) => state.counter.fuckCount);
  const currencyCount = useAppSelector((state) => state.counter.currencyCount);

  return (
    <div className="library-container">
      <div className="square-box">
        <div>
          <span className="wood-text">baby</span>
          <span className="count-text">{fuckCount}</span>
        </div>
        <div>
          <span className="wood-text">Sperm</span>
          <span className="count-text">{currencyCount}</span>
        </div>
      </div>
    </div>
  );
}
