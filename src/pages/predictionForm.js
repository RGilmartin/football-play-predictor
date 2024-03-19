import React, { useState } from "react";
import "./predictionForm.css";

function FootballPredictionForm() {
  const [down, setDown] = useState(1);
  const [distance, setDistance] = useState("");
  const [yardLine, setYardLine] = useState("");

  const handlePrediction = () => {
    // You can perform your prediction logic here
    console.log(
      `Prediction: Down - ${down}, Distance - ${distance}, Yard Line - ${yardLine}`,
    );
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
    </div>
  );
}

export default FootballPredictionForm;
