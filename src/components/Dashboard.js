import React, { useEffect, useState } from 'react';
import api from '../api';
import PredictionCard from './PredictionCard';
import Subscription from './Subscription';

const Dashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/predictions')
      .then(res => setPredictions(res.data))
      .catch(err => setError(err.response?.data?.message || 'Error loading predictions'));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <Subscription />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {predictions.map(p => <PredictionCard key={p._id} prediction={p} />)}
    </div>
  );
};

export default Dashboard;
