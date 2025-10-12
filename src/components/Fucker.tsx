import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addFucker, removeFucker } from "../store/counterSlice";

export default function Fucker() {
  const dispatch = useAppDispatch();
  const fuckerCount = useAppSelector((state) => state.counter.fuckerCount);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);

  const handleAddFucker = () => {
    dispatch(addFucker());
  };

  const handleRemoveFucker = () => {
    dispatch(removeFucker());
  };

  return (
    <div className="fucker-container">
      <div className="fucker-info">
        <span className="fucker-title">Fucker: {fuckerCount} </span>
        <span className="fucker-status">
          Status: {producerSperm >= fuckerCount ? 'Active' : 'Insufficient Sperm'}
        </span>
      </div>
      <div className="fucker-controls">
        <button 
          className="fucker-button add-button" 
          onClick={handleAddFucker}
        >
          + Add Fucker
        </button>
        <button 
          className="fucker-button remove-button" 
          onClick={handleRemoveFucker}
          disabled={fuckerCount === 0}
        >
          - Remove Fucker
        </button>
      </div>
    </div>
  );
}