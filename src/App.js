import React, { useState } from 'react';
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

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'view':
        return <View setCurrentPage={setCurrentPage} />;
      case 'add':
        return <Add setCurrentPage={setCurrentPage} />;
      case 'update':
        return <Update setCurrentPage={setCurrentPage} />;
      case 'delete':
        return <Delete setCurrentPage={setCurrentPage} />;
      case 'searchResult':
        return (
          <SearchResult
            searchQuery={searchQuery}
            setCurrentPage={setCurrentPage}
          />
        );
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  // Only show Navbar if not on login/register
  const showNavbar = !['login', 'register'].includes(currentPage);

  return (
    <div className="app-container">
      {showNavbar && (
        <Navbar
          setCurrentPage={setCurrentPage}
          setSearchQuery={setSearchQuery}
        />
      )}
      {renderPage()}
    </div>
  );
};

export default App;

