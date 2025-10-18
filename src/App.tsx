// src/App.tsx
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { executeTrade, executeProduction, incrementBabyCount, incrementProducerSperm } from './store/counterSlice';
import ActionButton from "./components/ActionButton";
import Environment from "./components/Environment";
import Text from "./components/Text";
import Library from "./components/Library";
import Square from "./components/Square";
import ResetButton from "./components/ResetButton";
import UniversalTimerControls from "./components/UniversalTimerControls";
import Graph from "./components/Graph";
import "../css/app.css";

function AppContent() {
  const dispatch = useAppDispatch();
  const universalTimerInterval = useAppSelector((state) => state.counter.universalTimerInterval);
  const isPaused = useAppSelector((state) => state.counter.isPaused);

  // Universal timer that controls all automated events
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return; // Skip execution if paused

      // Execute trade first
      dispatch(executeTrade());

      // Execute production
      dispatch(executeProduction());
    }, universalTimerInterval);

    return () => clearInterval(interval);
  }, [universalTimerInterval, isPaused, dispatch]);

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
        <ActionButton 
          label="Fuck" 
          action={() => dispatch(incrementBabyCount())} 
        />
        <ActionButton 
          label="Ejaculate" 
          action={() => dispatch(incrementProducerSperm())} 
        />
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