// src/App.tsx
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { incrementBabyCount, setProducerSperm, setConsumerSperm } from './store/counterSlice';
import Button from "./components/Button";
import Environment from "./components/Environment";
import Text from "./components/Text";
import Library from "./components/Library";
import Fucker from "./components/Fucker";
import Square from "./components/Square";
import Graph from "./components/Graph";
import ResetButton from "./components/ResetButton";
import "../css/app.css";

function AppContent() {
  const dispatch = useAppDispatch();
  const fuckerCount = useAppSelector((state) => state.counter.fuckerCount);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);
  const consumerSperm = useAppSelector((state) => state.counter.consumerSperm);

  // Automatic baby production based on Fucker count
  useEffect(() => {
    if (fuckerCount === 0) return; // No production if no Fuckers

    const interval = setInterval(() => {
      // Check if we have enough producer sperm for all Fuckers
      if (producerSperm >= fuckerCount) {
        // Add babies equal to number of Fuckers
        for (let i = 0; i < fuckerCount; i++) {
          dispatch(incrementBabyCount());
        }
        // Consume producer sperm and convert to consumer sperm
        dispatch(setProducerSperm(producerSperm - fuckerCount));
        dispatch(setConsumerSperm(consumerSperm + fuckerCount));
      }
      // If not enough sperm, no production occurs
    }, 1000); // 1 second interval

    return () => clearInterval(interval);
  }, [fuckerCount, producerSperm, consumerSperm, dispatch]);

  return (
    <div className="app-container">
      <Text />
      <Environment />
      <Library />
      <Square />
      <div className="reset-wrapper">
        <ResetButton />
      </div>
      <div className="controls-wrapper">
        <Button />
        <Fucker />
      </div>
      <Graph />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;