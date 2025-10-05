// src/App.tsx
import { Provider } from 'react-redux';
import { store } from './store';
import Button from "./components/Button";
import Environment from "./components/Environment";
import Text from "./components/Text";
import Library from "./components/Library";
import Masturbator from "./components/Masturbator";
import Square from "./components/Square";
import Graph from "./components/Graph";
import "../css/app.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Text />
        <Environment />
        <Library />
        <Square />
        <div className="controls-wrapper">
          <Button />
          <Masturbator />
        </div>
        <Graph />
      </div>
    </Provider>
  );
}

export default App;