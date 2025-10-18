import { useState, useEffect } from "react";
import "../../css/button.css";

interface ActionButtonProps {
  label: string;
  action: () => void;
  cooldownDuration?: number;
}

export default function ActionButton({ 
  label, 
  action, 
  cooldownDuration = 1 
}: ActionButtonProps) {
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
      action();
      setCooldown(cooldownDuration);
    }
  };

  return (
    <div className="button-container">
      <button className="button" onClick={handleClick} disabled={cooldown > 0}>
        <div
          className="cooldown-bar"
          style={{ transform: `scaleX(${cooldown})` }}
        />
        {label}
      </button>
    </div>
  );
}
