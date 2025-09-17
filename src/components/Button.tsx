import { useState, useEffect } from "react";
import "../../css/button.css";

export default function Button(): JSX.Element {
  const [count, setCount] = useState<number>(() => {
    try {
      const savedCount = localStorage.getItem('fuckCount');
      return savedCount ? parseInt(savedCount, 10) : 0;
    } catch (error) {
      console.log('Error loading count from localStorage:', error);
      return 0;
    }
  });
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
      setCount((c) => {
        const newCount = c + 1;
        // Save count to localStorage whenever it changes
        try {
          localStorage.setItem('fuckCount', newCount.toString());
        } catch (error) {
          console.log('Error saving count to localStorage:', error);
        }
        return newCount;
      });
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
        fuck
      </button>
    </div>
  );
}
