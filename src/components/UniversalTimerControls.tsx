import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setIsPaused, setUniversalTimerInterval } from "../store/counterSlice";
import "../../css/button.css";

export default function UniversalTimerControls() {
  const dispatch = useAppDispatch();
  const isPaused = useAppSelector((state) => state.counter.isPaused);
  const universalTimerInterval = useAppSelector((state) => state.counter.universalTimerInterval);

  const handlePauseToggle = () => {
    dispatch(setIsPaused(!isPaused));
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInterval = parseInt(event.target.value, 10);
    dispatch(setUniversalTimerInterval(newInterval));
  };

  return (
    <div className="universal-timer-controls">
      <div className="button-container">
        <button 
          className="button"
          onClick={handlePauseToggle}
          style={{
            backgroundColor: isPaused ? '#f44336' : '#4CAF50',
            color: 'white'
          }}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      
      <div className="timer-interval-controls">
        <label htmlFor="interval-slider" className="interval-label">
          Timer Interval: {universalTimerInterval}ms
        </label>
        <input
          id="interval-slider"
          type="range"
          min="100"
          max="5000"
          step="100"
          value={universalTimerInterval}
          onChange={handleIntervalChange}
          className="interval-slider"
        />
        <div className="slider-labels">
          <span>100ms</span>
          <span>5000ms</span>
        </div>
      </div>
    </div>
  );
}
