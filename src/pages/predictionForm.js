import React, { useState } from "react";
import modelJSON from "../model.json";
import "./predictionForm.css";
import { recurrent } from "brain.js";

const {LSTMTimeStep} = recurrent;

function FootballPredictionForm() {
  const [down, setDown] = useState(1);
  const [distance, setDistance] = useState("");
  const [yardLine, setYardLine] = useState("");
  const [prediction, setPrediction] = useState(-1);
  const [nn] = useState(new LSTMTimeStep());

  const scale = (number, [inMin, inMax], [outMin, outMax]) => {
    // if you need an integer value use Math.floor or Math.ceil here
    return ((number - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  const handlePrediction = () => {
    nn.fromJSON(modelJSON);
    let pred = nn.forecast([scale(down, [1,4], [0,1]),
    scale(yardLine, [-50, 50], [0,1]),
    scale(distance, [0,100],[0,1])], 1);

    console.log(pred); 
    
    // The closer to 1 the prediction is, the more sure it is that it is a run

    setPrediction(pred.toString() > 0 ? "Run" : "Pass");

    setDown(1);
    setDistance("");
    setYardLine("");
  };

  return (
    <div className="pred-form">
      <label className="down-selector">
        Down:
        <select
          value={down}
          onChange={(e) => setDown(parseInt(e.target.value))}
        >
          <option value={1}>1st Down</option>
          <option value={2}>2nd Down</option>
          <option value={3}>3rd Down</option>
          <option value={4}>4th Down</option>
        </select>
      </label>
      <br />
      <label className="dist-selector">
        Distance:
        <input
          type="text"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </label>
      <br />
      <label className="yardln-selector">
        Yard Line:
        <input
          type="text"
          value={yardLine}
          onChange={(e) => setYardLine(e.target.value)}
        />
      </label>
      <br />
      <button className="pred-button" onClick={handlePrediction}>
        Make Prediction
      </button>

      <p>{prediction}</p>
    </div>
  );
}

export default FootballPredictionForm;
