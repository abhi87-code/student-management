import React, { useState } from 'react';
import { FaEye, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Navbar = ({ setCurrentPage, setSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm.trim());
      setCurrentPage('searchResult');
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentPage('login');
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <button
          className="project-title"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onClick={() => setCurrentPage('home')}
        >
          Student Management
        </button>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search by Name / Roll / Branch"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="nav-right">
        <button className="nav-button" onClick={() => setCurrentPage('view')}>
          <FaEye className="icon" /> View
        </button>
        <button className="nav-button" onClick={() => setCurrentPage('add')}>
          <FaPlus className="icon" /> Add
        </button>
        <button className="nav-button" onClick={() => setCurrentPage('update')}>
          <FaEdit className="icon" /> Update
        </button>
        <button className="nav-button" onClick={() => setCurrentPage('delete')}>
          <FaTrash className="icon" /> Delete
        </button>
        <button className="nav-button" onClick={() => setCurrentPage('logout')}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;
