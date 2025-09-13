import React, { useState, useContext } from 'react';
import api from '../api';
import AuthContext from '../context/AuthContext';

const AuthForm = ({ type }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `/` + type;
      const body = type === 'register' ? { name, email, password } : { email, password };
      const res = await api.post(url, body);
      if (type === 'login') login(res.data.token);
      alert(res.data.message || "Success");
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'register' && (
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      )}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;
