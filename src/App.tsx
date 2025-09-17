// src/App.tsx
import Button from "./components/Button";
import Environment from "./components/Environment";
import Text from "./components/Text";
import Library from "./components/Library";
import "../css/app.css";

function App(): JSX.Element {
  return (
    <div className="app-container">
      <Text />
      <Environment />
      <Library />
      <Button />
    </div>
  );
}

export default App;
