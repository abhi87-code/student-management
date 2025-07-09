import React, { useState, useEffect } from 'react';
import './App.css';
import View from './pages/view';
import Home from './pages/Home';
import Delete from './pages/Delete';
import Update from './pages/Update';
import Add from './pages/Add';
import Navbar from './pages/NavBar';
import SearchResult from './pages/SearchResult';
import Login from './pages/login';
import Register from './pages/Register';
import Logout from './pages/logout';
import ManageAccess from './pages/ManageAccess';
import { decodeJWT } from './utils/decodeJWT';
import 'bootstrap/dist/css/bootstrap.min.css';


function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = decodeJWT(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState(localStorage.getItem('role') || 'USER');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (token && !isTokenExpired(token)) {
      setRole(storedRole || 'USER');
      setCurrentPage('home');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setRole('USER');
      setCurrentPage('login');
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login setCurrentPage={setCurrentPage} setRole={setRole} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'view':
        return <View setCurrentPage={setCurrentPage} />;
      case 'add':
        return <Add setCurrentPage={setCurrentPage} />;
      case 'update':
        return <Update setCurrentPage={setCurrentPage} role={role} />;
      case 'delete':
        return <Delete setCurrentPage={setCurrentPage} />;
      case 'searchResult':
        return (
          <SearchResult
            searchQuery={searchQuery}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'manageAccess':
        return <ManageAccess setCurrentPage={setCurrentPage} />;
      case 'logout':
        return <Logout setCurrentPage={setCurrentPage} setRole={setRole} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  const showNavbar = !['login', 'register'].includes(currentPage);

  return (
    <div className="app-container">
      {showNavbar && (
        <Navbar
          setCurrentPage={setCurrentPage}
          setSearchQuery={setSearchQuery}
          role={role}
        />
      )}
      {renderPage()}
    </div>
  );
};

export default App;
