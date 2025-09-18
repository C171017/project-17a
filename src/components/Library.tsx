import { useState, useEffect } from "react";
import "../../css/library.css";

export default function Library(): JSX.Element {
  const [fuckCount, setFuckCount] = useState<number>(0);

  useEffect(() => {
    // Load count from localStorage
    try {
      const savedCount = localStorage.getItem('fuckCount');
      setFuckCount(savedCount ? parseInt(savedCount, 10) : 0);
    } catch (error) {
      console.log('Error loading count from localStorage:', error);
    }
  }, []);

  return (
    <div className="library-container">
      <div className="square-box">
        <span className="wood-text">baby</span>
        <span className="count-text">{fuckCount}</span>
      </div>
    </div>
  );
}
