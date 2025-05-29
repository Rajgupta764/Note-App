import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/ContextProvider'; // ✅ Import context

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Use login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        const username = response.data.username || name;

        // ✅ Auto-login using context
        login(token, username);
        navigate('/');
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setErrorMsg('User already exists with this email.');
      } else {
        setErrorMsg('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
          Create Your Account
        </h2>

        {errorMsg && (
          <div className="mb-4 text-center text-red-600 font-semibold">
            {errorMsg}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200 outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-200 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link className="text-green-600" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
