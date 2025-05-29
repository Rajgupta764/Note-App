import React, { useContext, useState } from 'react';  // add useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthContext } from './context/ContextProvider';

const App = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  // Add searchTerm state here to manage the search input
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      {/* Pass searchTerm and setSearchTerm as props */}
      <Navbar 
        username={user} 
        isLoggedIn={isLoggedIn} 
        handleLogout={logout} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <Routes>
        {/* Pass searchTerm to Home so it can filter notes */}
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
