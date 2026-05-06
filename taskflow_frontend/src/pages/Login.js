import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      alert("Login successful");

    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {location.state?.message && (
        <div className="alert alert-success">
          {location.state.message}
        </div>
      )}
      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <div className="d-flex gap-2 mt-3">
        <a href="/register" className="btn btn-secondary">
          Create Account
        </a>
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;