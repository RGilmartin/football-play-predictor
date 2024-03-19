import logo from "./logo.svg";
import "./App.css";
import FootballPredictionForm from "./pages/predictionForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Football Prediction Form</h1>
      </header>
      <div className="Form">
        <FootballPredictionForm />
      </div>
    </div>
  );
}

export default App;
