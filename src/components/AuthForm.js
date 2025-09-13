import React, { useState, useContext } from 'react';
import api from '../api';
import AuthContext from '../context/AuthContext';

const AuthForm = ({ type }) => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = type === 'register' ? { name, email, password } : { email, password };
      const res = await api.post(`/${type}`, body);
      if (type === 'login') login(res.data.token);
      alert(res.data.message || "Success");
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
      {type === 'register' && <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;
