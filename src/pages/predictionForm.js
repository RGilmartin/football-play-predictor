import React, { useEffect, useRef, useState } from "react";
import "./predictionForm.css";
import { brain } from "brain.js";
const modelJSON = require('../model.json');

function FootballPredictionForm() {
  const [down, setDown] = useState(1);
  const [distance, setDistance] = useState("");
  const [yardLine, setYardLine] = useState("");
  const [prediction, setPrediction] = useState(-1);
  const [nn, setNN] = useState(new brain.NeuralNetwork() );

  const scale = (number, [inMin, inMax], [outMin, outMax]) => {
    // if you need an integer value use Math.floor or Math.ceil here
    return ((number - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  useEffect(() => {
  
  }, [nn]);

  const handlePrediction = () => {
    nn.fromJSON(JSON.parse(modelJSON));
    let pred = nn.run({input: {DN: scale(down, [1,4], [0,1]),
    YARDLN: scale(yardLine, [-50, 50], [0,1]),
    DIST: scale(distance, [0,100],[0,1])}});
    
    setPrediction(pred);

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
