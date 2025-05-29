import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContext } from './context/ContextProvider';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  // State to manage search input for Home notes filtering
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      {/* Navbar with props for auth and search */}
      <Navbar
        username={user}
        isLoggedIn={isLoggedIn}
        handleLogout={logout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Routes>
        {/* Home page with filtered notes */}
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Toast notifications container */}
      <ToastContainer />
    </Router>
  );
};

export default App;
