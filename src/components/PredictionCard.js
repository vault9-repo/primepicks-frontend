import React from 'react';

const PredictionCard = ({ prediction }) => (
  <div style={{ border: '1px solid gray', padding: 10, margin: 10 }}>
    <h3>{prediction.match}</h3>
    <p>Tip: {prediction.tip}</p>
    <p>Odds: {prediction.odds}</p>
    <p>Date: {new Date(prediction.date).toLocaleDateString()}</p>
  </div>
);

export default PredictionCard;
