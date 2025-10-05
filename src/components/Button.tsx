import { useState, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { incrementBabyCount } from "../store/counterSlice";
import "../../css/button.css";

export default function Button() {
  const dispatch = useAppDispatch();
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    let interval: number;
    if (cooldown > 0) {
      interval = window.setInterval(() => {
        setCooldown((prev) => Math.max(prev - 0.02, 0));
      }, 20);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleClick = (): void => {
    if (cooldown === 0) {
      dispatch(incrementBabyCount());
      setCooldown(1);
    }
  };

  return (
    <div className="button-container">
      <button className="button" onClick={handleClick} disabled={cooldown > 0}>
        <div
          className="cooldown-bar"
          style={{ transform: `scaleX(${cooldown})` }}
        />
        Fuck
      </button>
    </div>
  );
}
