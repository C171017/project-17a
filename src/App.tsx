// src/App.tsx
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { incrementBabyCount, setProducerSperm, setConsumerSperm, setBabyCount } from './store/counterSlice';
import Button from "./components/Button";
import Environment from "./components/Environment";
import Text from "./components/Text";
import Library from "./components/Library";
import Square from "./components/Square";
import Graph from "./components/Graph";
import ResetButton from "./components/ResetButton";
import UniversalTimerControls from "./components/UniversalTimerControls";
import "../css/app.css";

function AppContent() {
  const dispatch = useAppDispatch();
  const fuckerCount = useAppSelector((state) => state.counter.fuckerCount);
  const producerSperm = useAppSelector((state) => state.counter.producerSperm);
  const consumerSperm = useAppSelector((state) => state.counter.consumerSperm);
  const babyCount = useAppSelector((state) => state.counter.babyCount);
  const currentPrice = useAppSelector((state) => state.counter.currentPrice);
  const universalTimerInterval = useAppSelector((state) => state.counter.universalTimerInterval);
  const isPaused = useAppSelector((state) => state.counter.isPaused);

  // Universal timer that controls all automated events
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return; // Skip execution if paused

      // Baby production logic
      if (fuckerCount > 0) {
        // Calculate total cost: sum of linear costs (1+2+3+...+n = n*(n+1)/2)
        const totalCost = (fuckerCount * (fuckerCount + 1)) / 2;
        
        // Check if we have enough producer sperm for all Fuckers
        if (producerSperm >= totalCost) {
          // Add babies equal to number of Fuckers
          for (let i = 0; i < fuckerCount; i++) {
            dispatch(incrementBabyCount());
          }
          // Consume producer sperm and convert to consumer sperm
          dispatch(setProducerSperm(producerSperm - totalCost));
          dispatch(setConsumerSperm(consumerSperm + totalCost));
        }
      }

      // Auto trade logic (moved from Graph.tsx)
      const quantity = Math.floor((10 - currentPrice) / 1.2);
      const areaValue = quantity * currentPrice;
      const tradeAmount = areaValue;
      
      // Check if there's enough consumer sperm and babies for the trade
      const canTrade = consumerSperm >= tradeAmount && babyCount >= quantity;
      
      if (canTrade) {
        dispatch(setConsumerSperm(consumerSperm - tradeAmount));
        dispatch(setProducerSperm(producerSperm + tradeAmount));
        dispatch(setBabyCount(babyCount - quantity));
      }
    }, universalTimerInterval);

    return () => clearInterval(interval);
  }, [fuckerCount, babyCount, currentPrice, universalTimerInterval, isPaused, dispatch]);

  return (
    <div className="app-container">
      <Text />
      <Environment />
      <Library />
      <Square />
      <div className="reset-wrapper">
        <ResetButton />
        <UniversalTimerControls />
      </div>
      <div className="controls-wrapper">
        <Button />
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