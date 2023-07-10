import "./App.scss";
import BubbleChat from "./components/BubbleChat";
import InputFile from "./components/InputFile";

function App() {
  return (
    <div className="App">
      <InputFile />

      <BubbleChat />
    </div>
  );
}

export default App;
