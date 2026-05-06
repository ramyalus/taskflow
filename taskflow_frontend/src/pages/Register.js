import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/register', {
        name,
        email,
        password
      });

      alert("User created successfully");
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <input
        className="form-control mb-2"
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

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

      <button onClick={handleRegister} className="btn btn-success">
        Register
      </button>
    </div>
  );
}

export default Register;